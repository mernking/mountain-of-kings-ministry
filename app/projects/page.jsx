"use client";

import React, { useState, useMemo, useEffect, useCallback } from "react";
import {
  Search,
  Calendar,
  Database,
  Box,
  ArrowRight,
  Binary,
  Loader2,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import Link from "next/link";

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState(["All"]);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1 });
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [sortByDate, setSortByDate] = useState("newest");

  const fetchProjects = useCallback(async (page = 1) => {
    setLoading(true);
    try {
      const query = new URLSearchParams({
        page: page.toString(),
        limit: "9",
        category: activeFilter === "All" ? "all" : activeFilter,
      }).toString();
      
      const res = await fetch(`/api/v1/projects?${query}`);
      const json = await res.json();
      setProjects(json.data || []);
      setPagination(json.pagination || { page: 1, totalPages: 1 });
    } catch (error) {
      console.error("Failed to fetch projects:", error);
    } finally {
      setLoading(false);
    }
  }, [activeFilter]);

  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/v1/projects/categories");
      const data = await res.json();
      if (Array.isArray(data)) {
        setCategories(["All", ...data]);
      }
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProjects(1);
  }, [fetchProjects]);

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      return p.title.toLowerCase().includes(searchQuery.toLowerCase());
    }).sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return sortByDate === "newest" ? dateB - dateA : dateA - dateB;
    });
  }, [searchQuery, sortByDate, projects]);

  return (
    <main className="min-h-screen bg-background pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="text-5xl md:text-7xl font-display text-text italic mb-4">
            Repository
          </h1>
          <p className="text-text/50 uppercase tracking-[0.3em] text-xs">
            Innovation • Science • Engineering Solutions
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 mb-12 items-center justify-between border-b border-text/5 pb-8">
          <div className="relative w-full lg:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text/30" size={18} />
            <input
              type="text"
              placeholder="Search current page..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-neutral-900/40 border border-text/10 py-3 pl-12 pr-4 text-text focus:outline-none focus:border-accent transition-all text-sm font-mono"
            />
          </div>

          <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto">
            <div className="flex bg-neutral-900/40 p-1 border border-text/10 rounded-sm overflow-x-auto max-w-[50vw]">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`px-4 py-1.5 text-[9px] uppercase font-bold tracking-widest transition-all whitespace-nowrap ${
                    activeFilter === cat ? "bg-accent text-background" : "text-text/40 hover:text-text"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <button
              onClick={() => setSortByDate(sortByDate === "newest" ? "oldest" : "newest")}
              className="flex items-center gap-2 px-4 py-2 border border-text/10 text-[9px] uppercase tracking-widest text-text/60 hover:border-accent transition-all font-bold"
            >
              <Calendar size={14} />
              {sortByDate === "newest" ? "Newest Build" : "Oldest Build"}
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-accent" size={40} />
          </div>
        ) : (
          <div className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
              {filteredProjects.length > 0 ? (
                filteredProjects.map((project, idx) => (
                  <Link
                    href={`/projects/${project.slug}`}
                    key={project.id || idx}
                    className="group relative p-8 bg-neutral-900/20 border border-text/10 hover:bg-neutral-900/50 transition-all duration-500 overflow-hidden"
                  >
                    <Binary
                      className="absolute -right-4 -top-4 text-text/5 opacity-[0.03] group-hover:opacity-10 transition-opacity"
                      size={120}
                    />

                    <div className="flex justify-between items-start mb-12">
                      <span className="text-[9px] font-mono tracking-widest text-accent uppercase border border-accent/20 px-2 py-1">
                        {project.status}
                      </span>
                      <span className="text-text/20 font-mono text-[10px]">
                        MTN-{(pagination.page - 1) * 9 + idx + 1}
                      </span>
                    </div>

                    <h3 className="text-2xl font-display text-text mb-2 group-hover:text-accent transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-text/40 text-[10px] uppercase tracking-widest font-bold mb-6 flex items-center gap-2">
                      <Database size={12} /> {project.category}
                    </p>

                    <p className="text-text/50 text-sm font-sans leading-relaxed mb-8 h-12 overflow-hidden line-clamp-2">
                      {project.description}
                    </p>

                    <div className="flex items-center justify-between border-t border-text/5 pt-6">
                      <div className="text-text/30 font-mono text-[10px] uppercase">
                        Compiled: {new Date(project.createdAt).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-2 text-accent text-[10px] font-bold uppercase tracking-[0.2em] group-hover:translate-x-1 transition-transform">
                        View Specs <ArrowRight size={14} />
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="col-span-full py-32 text-center border border-dashed border-text/10 bg-neutral-900/10">
                  <Box size={40} className="mx-auto text-text/10 mb-4" />
                  <p className="text-text/30 font-display text-2xl italic">No technical schematics found in this sector.</p>
                </div>
              )}
            </div>

            {/* Pagination Controls */}
            {pagination.totalPages > 1 && (
              <div className="flex justify-center items-center gap-6 pt-12 border-t border-text/5">
                <button
                  disabled={pagination.page === 1}
                  onClick={() => fetchProjects(pagination.page - 1)}
                  className="flex items-center gap-2 px-6 py-3 border border-text/10 text-text/40 hover:text-accent hover:border-accent disabled:opacity-20 disabled:cursor-not-allowed transition-all text-[10px] font-bold uppercase tracking-widest"
                >
                  <ChevronLeft size={16} /> Previous
                </button>
                <div className="flex flex-col items-center">
                  <span className="text-accent font-display text-xl">{pagination.page}</span>
                  <span className="text-[8px] text-text/30 uppercase font-bold tracking-tighter">of {pagination.totalPages}</span>
                </div>
                <button
                  disabled={pagination.page === pagination.totalPages}
                  onClick={() => fetchProjects(pagination.page + 1)}
                  className="flex items-center gap-2 px-6 py-3 border border-text/10 text-text/40 hover:text-accent hover:border-accent disabled:opacity-20 disabled:cursor-not-allowed transition-all text-[10px] font-bold uppercase tracking-widest"
                >
                  Next <ChevronRight size={16} />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
