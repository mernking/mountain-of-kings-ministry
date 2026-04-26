import { db } from "@/db";
import { projects } from "@/db/schema";
import { sql } from "drizzle-orm";

export async function GET() {
  try {
    const data = await db
      .selectDistinct({ category: projects.category })
      .from(projects);
    
    return Response.json(data.map(item => item.category));
  } catch (error) {
    return Response.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
