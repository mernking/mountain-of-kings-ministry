"use client";

import React, { useEffect, useState } from "react";
import { Box, ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";

export default function ProjectShowcase() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("/api/v1/projects?limit=3");
        const json = await res.json();
        setProjects(json.data || []);
      } catch (error) {
        console.error("Failed to fetch showcase projects:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  return (
    <section className="py-24 px-6 bg-background border-t border-text/5">
      <div className="max-w-7xl mx-auto">
        {/* Header with a "Technical Lab" feel */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-px w-12 bg-accent" />
              <span className="text-accent text-xs font-bold uppercase tracking-[0.4em]">
                Innovation & Research
              </span>
            </div>
            <h3 className="text-4xl md:text-6xl font-display text-text italic">
              Solution Provision
            </h3>
            <p className="mt-4 text-text/50 font-sans text-sm md:text-base leading-relaxed">
              Providing blueprints, software, and engineering schematics that
              solve real-world problems through divine insight and technical
              excellence.
            </p>
          </div>

          <Link
            href="/projects"
            className="inline-flex items-center gap-3 px-8 py-4 bg-transparent border border-text/10 text-text/60 hover:text-accent hover:border-accent transition-all text-xs font-bold uppercase tracking-[0.3em] rounded-sm group"
          >
            Visit Repository <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Project Grid: Schematic Style */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-1 min-h-[400px]">
          {loading ? (
            <div className="col-span-full flex items-center justify-center py-32 border border-dashed border-text/10">
              <Loader2 className="animate-spin text-accent" size={32} />
            </div>
          ) : projects.length > 0 ? (
            projects.map((project, index) => (
              <Link
                href={`/projects/${project.slug}`}
                key={project.id || index}
                className="group relative p-8 bg-neutral-900/20 border border-text/10 hover:bg-neutral-900/50 transition-all duration-500 overflow-hidden"
              >
                {/* Background Schematic Decoration (SVG) */}
                <div className="absolute top-0 right-0 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity">
                  <svg width="200" height="200" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="currentColor"
                      fill="none"
                      strokeWidth="0.5"
                    />
                    <path
                      d="M10 50 L90 50 M50 10 L50 90"
                      stroke="currentColor"
                      fill="none"
                      strokeWidth="0.5"
                    />
                  </svg>
                </div>

                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-12">
                    <span className="text-[10px] tracking-[0.3em] uppercase text-accent border border-accent/30 px-2 py-1">
                      {project.tag || "Technical"}
                    </span>
                    <span className="text-text/20 font-mono text-xs">
                      0{index + 1}
                    </span>
                  </div>

                  <h4 className="text-2xl font-display text-text mb-2 group-hover:text-accent transition-colors">
                    {project.title}
                  </h4>
                  <p className="text-accent/60 text-xs uppercase tracking-widest mb-6 font-bold">
                    {project.category}
                  </p>

                  <p className="text-text/60 text-sm leading-relaxed mb-8 font-sans h-20 line-clamp-3">
                    {project.description}
                  </p>

                  <div className="flex items-center gap-3 text-text group-hover:text-accent transition-colors">
                    <span className="text-xs uppercase tracking-widest font-bold">
                      View Schematics
                    </span>
                    <div className="w-8 h-px bg-text/30 group-hover:bg-accent group-hover:w-12 transition-all" />
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-32 border border-dashed border-text/10 space-y-4">
              <Box className="text-text/10" size={48} />
              <p className="text-text/30 font-display text-xl italic text-center">No active builds found in the laboratory.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
