"use client";

import React, { useState, useMemo, useEffect, useCallback } from "react";
import { Search, Calendar, Filter, MapPin, ArrowRight, Loader2, ChevronLeft, ChevronRight, Clock } from "lucide-react";
import Link from "next/link";

const getProgramStatus = (schedule) => {
  if (!schedule || schedule.length === 0) return "Upcoming";
  
  const now = new Date();
  
  // Sort schedule by date and time
  const sortedSchedule = [...schedule].sort((a, b) => {
    return new Date(`${a.date}T${a.startTime || '00:00'}`) - new Date(`${b.date}T${b.startTime || '00:00'}`);
  });

  const startOfEvent = new Date(`${sortedSchedule[0].date}T${sortedSchedule[0].startTime || '00:00'}`);
  const endOfEvent = new Date(`${sortedSchedule[sortedSchedule.length - 1].date}T${sortedSchedule[sortedSchedule.length - 1].endTime || '23:59'}`);

  if (now < startOfEvent) return "Upcoming";
  if (now >= startOfEvent && now <= endOfEvent) return "Ongoing";
  return "Completed";
};

export default function ProgrammesPage() {
  const [programmes, setProgrammes] = useState([]);
  const [categories, setCategories] = useState(["All"]);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1 });
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [sortByDate, setSortByDate] = useState("newest");

  const fetchProgrammes = useCallback(async (page = 1) => {
    setLoading(true);
    try {
      const query = new URLSearchParams({
        page: page.toString(),
        limit: "9",
        category: activeFilter === "All" ? "all" : activeFilter,
      }).toString();
      
      const res = await fetch(`/api/v1/programmes?${query}`);
      const json = await res.json();
      setProgrammes(json.data || []);
      setPagination(json.pagination || { page: 1, totalPages: 1 });
    } catch (error) {
      console.error("Failed to fetch programmes:", error);
    } finally {
      setLoading(false);
    }
  }, [activeFilter]);

  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/v1/programmes/categories");
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
    fetchProgrammes(1);
  }, [fetchProgrammes]);

  const filteredProgrammes = useMemo(() => {
    return programmes.filter((p) => {
      return p.title.toLowerCase().includes(searchQuery.toLowerCase());
    }).sort((a, b) => {
      const dateA = a.schedule?.[0]?.date ? new Date(a.schedule[0].date) : new Date(a.date);
      const dateB = b.schedule?.[0]?.date ? new Date(b.schedule[0].date) : new Date(b.date);
      return sortByDate === "newest" ? dateB - dateA : dateA - dateB;
    });
  }, [searchQuery, sortByDate, programmes]);

  return (
    <main className="min-h-screen bg-background pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="text-5xl md:text-7xl font-display text-text italic mb-4">
            Programmes
          </h1>
          <p className="text-text/50 uppercase tracking-[0.3em] text-xs">
            Spiritual Engagements & Marketplace Training
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
              className="w-full bg-neutral-900/40 border border-text/10 py-3 pl-12 pr-4 text-text focus:outline-none focus:border-accent transition-all text-sm font-sans"
            />
          </div>

          <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto">
            <div className="flex bg-neutral-900/40 p-1 border border-text/10 rounded-sm overflow-x-auto max-w-[50vw]">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`px-4 py-1.5 text-[10px] uppercase font-bold tracking-widest transition-all whitespace-nowrap ${
                    activeFilter === cat ? "bg-accent text-background" : "text-text/40 hover:text-text"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <button
              onClick={() => setSortByDate(sortByDate === "newest" ? "oldest" : "newest")}
              className="flex items-center gap-2 px-4 py-2 border border-text/10 text-[10px] uppercase tracking-widest text-text/60 hover:border-accent transition-all"
            >
              <Calendar size={14} />
              {sortByDate === "newest" ? "Newest First" : "Oldest First"}
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
              {filteredProgrammes.length > 0 ? (
                filteredProgrammes.map((p, idx) => {
                  const dynamicStatus = getProgramStatus(p.schedule);
                  const firstDay = p.schedule?.[0];
                  const lastDay = p.schedule?.[p.schedule.length - 1];

                  return (
                    <div
                      key={p.id || idx}
                      className="group relative p-8 bg-neutral-900/20 border border-text/10 hover:bg-neutral-900/50 transition-all duration-500"
                    >
                      <div className="flex justify-between items-start mb-8">
                        <span className={`text-[9px] font-bold uppercase tracking-widest px-2 py-1 border ${
                          dynamicStatus === "Upcoming" ? "border-accent text-accent animate-pulse" : 
                          dynamicStatus === "Ongoing" ? "border-green-500 text-green-500 animate-pulse" :
                          "border-text/20 text-text/30"
                        }`}>
                          {dynamicStatus}
                        </span>
                        <span className="text-text/20 font-mono text-[10px]">
                          P-{(pagination.page - 1) * 9 + idx + 1}
                        </span>
                      </div>

                      <h3 className="text-2xl font-display text-text mb-2 group-hover:text-accent transition-colors">
                        {p.title}
                      </h3>
                      <div className="flex items-center gap-2 text-accent/60 text-[11px] uppercase tracking-widest font-bold mb-6">
                        <MapPin size={12} /> {p.location}
                      </div>

                      <p className="text-text/50 text-sm font-sans leading-relaxed mb-8 h-12 overflow-hidden line-clamp-2">
                        {p.description}
                      </p>

                      <div className="flex items-center justify-between border-t border-text/5 pt-6">
                        <div className="text-text/40 font-mono text-xs uppercase flex flex-col gap-1">
                          <span className="flex items-center gap-1"><Calendar size={10}/> {firstDay ? `${firstDay.date}${p.schedule.length > 1 ? ` — ${lastDay.date}` : ''}` : p.date}</span>
                          {firstDay?.startTime && <span className="flex items-center gap-1 opacity-50"><Clock size={10}/> {firstDay.startTime}</span>}
                        </div>
                        <Link 
                          href={`/programmes/${p.slug}`}
                          className="flex items-center gap-2 text-accent text-[10px] font-bold uppercase tracking-[0.2em] group-hover:translate-x-1 transition-transform"
                        >
                          Details <ArrowRight size={14} />
                        </Link>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="col-span-full py-20 text-center border border-dashed border-text/10">
                  <p className="text-text/30 font-display text-2xl italic">No programmes found in this sector.</p>
                </div>
              )}
            </div>

            {/* Pagination Controls */}
            {pagination.totalPages > 1 && (
              <div className="flex justify-center items-center gap-6 pt-12 border-t border-text/5">
                <button
                  disabled={pagination.page === 1}
                  onClick={() => fetchProgrammes(pagination.page - 1)}
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
                  onClick={() => fetchProgrammes(pagination.page + 1)}
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
