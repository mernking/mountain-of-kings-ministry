import { db } from "@/db";
import { inquiries } from "@/db/schema";
import { desc, eq, and, gte, lte, sql, count } from "drizzle-orm";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;
    const status = searchParams.get("status");
    const reason = searchParams.get("reason");
    const dateFrom = searchParams.get("dateFrom");
    const dateTo = searchParams.get("dateTo");
    
    const offset = (page - 1) * limit;

    let filters = [];
    if (status && status !== 'all') filters.push(eq(inquiries.status, status));
    if (reason && reason !== 'all') filters.push(eq(inquiries.reason, reason));
    if (dateFrom) filters.push(gte(inquiries.createdAt, new Date(dateFrom)));
    if (dateTo) filters.push(lte(inquiries.createdAt, new Date(dateTo)));

    const whereClause = filters.length > 0 ? and(...filters) : undefined;

    const data = await db
      .select()
      .from(inquiries)
      .where(whereClause)
      .limit(limit)
      .offset(offset)
      .orderBy(desc(inquiries.createdAt));

    const [totalCount] = await db
      .select({ count: count() })
      .from(inquiries)
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
    console.error("API Error [Inquiries GET]:", error);
    return Response.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const [newItem] = await db
      .insert(inquiries)
      .values({
        name: body.name,
        email: body.email,
        phone: body.phone,
        reason: body.reason,
        subject: body.subject,
        message: body.message,
        status: "pending",
      })
      .returning();

    return Response.json(newItem, { status: 201 });
  } catch (error) {
    console.error("API Error [Inquiries POST]:", error);
    return Response.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
