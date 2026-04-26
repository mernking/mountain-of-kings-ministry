import { db } from "@/db";
import { inquiries } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const [data] = await db
      .select()
      .from(inquiries)
      .where(eq(inquiries.id, id));
    if (!data) return Response.json({ message: "Not Found" }, { status: 404 });
    return Response.json(data);
  } catch (error) {
    return Response.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export async function PATCH(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const [updated] = await db
      .update(inquiries)
      .set(body)
      .where(eq(inquiries.id, id))
      .returning();

    if (!updated)
      return Response.json({ message: "Not Found" }, { status: 404 });
    return Response.json(updated);
  } catch (error) {
    return Response.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    const [deleted] = await db
      .delete(inquiries)
      .where(eq(inquiries.id, id))
      .returning();
    if (!deleted)
      return Response.json({ message: "Not Found" }, { status: 404 });
    return Response.json({ message: "Deleted successfully" });
  } catch (error) {
    return Response.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
