import { db } from "@/db";
import { projects } from "@/db/schema";
import { desc, eq, and, count } from "drizzle-orm";
import { uploadFile } from "@/utilities/supabase";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;
    const category = searchParams.get("category");
    const status = searchParams.get("status");
    
    const offset = (page - 1) * limit;

    let filters = [];
    if (category && category !== 'all') filters.push(eq(projects.category, category));
    if (status && status !== 'all') filters.push(eq(projects.status, status));

    const whereClause = filters.length > 0 ? and(...filters) : undefined;

    const data = await db
      .select()
      .from(projects)
      .where(whereClause)
      .limit(limit)
      .offset(offset)
      .orderBy(desc(projects.createdAt));

    const [totalCount] = await db
      .select({ count: count() })
      .from(projects)
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
    console.error("API Error [Projects GET]:", error);
    return Response.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const contentType = request.headers.get('content-type') || '';
    
    let body;
    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      body = {
        title: formData.get('title'),
        slug: formData.get('slug'),
        category: formData.get('category'),
        status: formData.get('status') || "Active",
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
    }

    const [newItem] = await db
      .insert(projects)
      .values({
        title: body.title,
        slug: body.slug,
        category: body.category,
        status: body.status || "Active",
        description: body.description,
        contentBlocks: body.contentBlocks || [],
      })
      .returning();

    return Response.json(newItem, { status: 201 });
  } catch (error) {
    console.error("API Error [Projects POST]:", error);
    if (error.code === "23505") {
      return Response.json({ message: "Slug must be unique" }, { status: 400 });
    }
    return Response.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
