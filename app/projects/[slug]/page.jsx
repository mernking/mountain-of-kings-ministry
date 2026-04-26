import React from "react";
import Link from "next/link";
import { ArrowLeft, Box } from "lucide-react";
import BlockRenderer from "@/components/sections/BlockRenderer";
import ProjectShowcase from "@/components/sections/ProjectShowcase";
import ShareButton from "@/components/fragments/ShareButton";
import { db } from "@/db";
import { projects } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";

export default async function ProjectDetails({ params }) {
  const { slug } = await params;

  const [project] = await db
    .select()
    .from(projects)
    .where(eq(projects.slug, slug));

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background pt-32 pb-20 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <Link
            href="/projects"
            className="flex items-center gap-2 text-text/40 hover:text-accent transition-colors text-xs uppercase tracking-widest font-bold"
          >
            <ArrowLeft size={16} /> Repository
          </Link>
          <ShareButton title={project.title} text={project.description} />
        </div>

        <div className="mb-20">
          <div className="flex items-center gap-3 mb-4 text-accent">
            <Box size={16} />
            <span className="text-xs font-mono uppercase tracking-[0.3em]">
              {project.status}
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-display text-text italic mb-6 leading-none">
            {project.title}
          </h1>
          <p className="text-text/60 text-lg font-sans max-w-3xl leading-relaxed">
            {project.description}
          </p>
        </div>

        <div className="space-y-4">
          <BlockRenderer content={project.contentBlocks || []} />
        </div>

        <div className="mt-20 pt-12 border-t border-text/5 text-center">
          <Link
            href="/contact?reason=innovation"
            className="inline-block group"
          >
            <p className="text-text/40 text-[10px] uppercase tracking-[0.4em] mb-4 group-hover:text-accent transition-colors">
              Project Inquiry
            </p>
            <h2 className="text-3xl font-display text-text italic hover:text-accent transition-colors">
              Request Technical Specs
            </h2>
            <div className="h-px w-12 bg-accent mx-auto mt-6 group-hover:w-24 transition-all duration-500" />
          </Link>
        </div>
      </div>
      <ProjectShowcase />
    </main>
  );
}
