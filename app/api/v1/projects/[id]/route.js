import { db } from "@/db";
import { projects } from "@/db/schema";
import { eq } from "drizzle-orm";
import { uploadFile } from "@/utilities/supabase";

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const [data] = await db.select().from(projects).where(eq(projects.id, id));
    if (!data) return Response.json({ message: "Not Found" }, { status: 404 });
    return Response.json(data);
  } catch (error) {
    return Response.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export async function PATCH(request, { params }) {
  try {
    const { id } = await params;
    const contentType = request.headers.get('content-type') || '';
    
    let body;
    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      body = {};
      
      const fields = ['title', 'slug', 'category', 'status', 'description'];
      fields.forEach(field => {
        if (formData.has(field)) body[field] = formData.get(field);
      });

      if (formData.has('contentBlocks')) {
        body.contentBlocks = JSON.parse(formData.get('contentBlocks') || '[]');
        
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
      }
    } else {
      body = await request.json();
    }

    const [updated] = await db
      .update(projects)
      .set(body)
      .where(eq(projects.id, id))
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
      .delete(projects)
      .where(eq(projects.id, id))
      .returning();
    if (!deleted)
      return Response.json({ message: "Not Found" }, { status: 404 });
    return Response.json({ message: "Deleted successfully" });
  } catch (error) {
    return Response.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
