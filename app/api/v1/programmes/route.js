import { db } from "@/db";
import { programmes } from "@/db/schema";
import { desc, eq, and, gte, lte, count } from "drizzle-orm";
import { uploadFile } from "@/utilities/supabase";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;
    const status = searchParams.get("status");
    const category = searchParams.get("category");
    const dateFrom = searchParams.get("dateFrom");
    const dateTo = searchParams.get("dateTo");
    
    const offset = (page - 1) * limit;

    let filters = [];
    if (status && status !== 'all') filters.push(eq(programmes.status, status));
    if (category && category !== 'all') filters.push(eq(programmes.category, category));
    if (dateFrom) filters.push(gte(programmes.date, dateFrom));
    if (dateTo) filters.push(lte(programmes.date, dateTo));

    const whereClause = filters.length > 0 ? and(...filters) : undefined;

    const data = await db
      .select()
      .from(programmes)
      .where(whereClause)
      .limit(limit)
      .offset(offset)
      .orderBy(desc(programmes.date));

    const [totalCount] = await db
      .select({ count: count() })
      .from(programmes)
      .where(whereClause);

    return Response.json({ 
      data,
      pagination: {
        total: totalCount.count,
        page,
        limit,
        totalPages: Math.ceil(totalCount.count / limit)
      }
    });
  } catch (error) {
    console.error("API Error [Programmes GET]:", error);
    return Response.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const contentType = request.headers.get('content-type') || '';
    
    let body;
    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      const schedule = JSON.parse(formData.get('schedule') || '[]');
      
      // Extract primary date from schedule
      const primaryDate = schedule.length > 0 ? schedule[0].date : null;

      body = {
        title: formData.get('title'),
        slug: formData.get('slug'),
        category: formData.get('category'),
        status: formData.get('status') || "Upcoming",
        date: primaryDate,
        schedule: schedule,
        location: formData.get('location'),
        description: formData.get('description'),
        contentBlocks: JSON.parse(formData.get('contentBlocks') || '[]'),
      };

      for (let i = 0; i < body.contentBlocks.length; i++) {
        const block = body.contentBlocks[i];
        if (block.type === 'image' || block.type === 'schematic') {
          const file = formData.get(`file_${block.id}`);
          if (file && file instanceof File && file.size > 0) {
            const url = await uploadFile(file);
            if (url) {
              if (block.type === 'image') block.url = url;
              if (block.type === 'schematic') block.imageUrl = url;
            }
          }
        }
      }
    } else {
      body = await request.json();
      if (body.schedule && body.schedule.length > 0 && !body.date) {
        body.date = body.schedule[0].date;
      }
    }

    const [newItem] = await db
      .insert(programmes)
      .values({
        title: body.title,
        slug: body.slug,
        category: body.category,
        status: body.status || "Upcoming",
        date: body.date,
        schedule: body.schedule || [],
        location: body.location,
        description: body.description,
        contentBlocks: body.contentBlocks || [],
      })
      .returning();

    return Response.json(newItem, { status: 201 });
  } catch (error) {
    console.error("API Error [Programmes POST]:", error);
    return Response.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
