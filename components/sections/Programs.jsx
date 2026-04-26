"use client";

import React, { useEffect, useState } from "react";
import { Calendar, CheckCircle, Clock, MapPin, ArrowRight, Loader2, CalendarDays } from "lucide-react";
import Link from "next/link";

const getProgramStatus = (schedule) => {
  if (!schedule || schedule.length === 0) return "Upcoming";
  const now = new Date();
  const sortedSchedule = [...schedule].sort((a, b) => new Date(`${a.date}T${a.startTime || '00:00'}`) - new Date(`${b.date}T${b.startTime || '00:00'}`));
  const startOfEvent = new Date(`${sortedSchedule[0].date}T${sortedSchedule[0].startTime || '00:00'}`);
  const endOfEvent = new Date(`${sortedSchedule[sortedSchedule.length - 1].date}T${sortedSchedule[sortedSchedule.length - 1].endTime || '23:59'}`);
  if (now < startOfEvent) return "Upcoming";
  if (now >= startOfEvent && now <= endOfEvent) return "Ongoing";
  return "Completed";
};

export default function Programs() {
  const [programmes, setProgrammes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProgrammes = async () => {
      try {
        const res = await fetch("/api/v1/programmes?limit=3");
        const json = await res.json();
        setProgrammes(json.data || []);
      } catch (error) {
        console.error("Failed to fetch showcase programmes:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProgrammes();
  }, []);

  return (
    <section className="py-24 px-6 bg-background border-t border-text/5">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-px w-12 bg-accent" />
              <span className="text-accent text-xs font-bold uppercase tracking-[0.4em]">
                Spiritual Engagements
              </span>
            </div>
            <h3 className="text-4xl md:text-6xl font-display text-text italic">
              Programs & Classes
            </h3>
            <p className="mt-4 text-text/50 font-sans text-sm md:text-base leading-relaxed">
              From open crusades to intimate discipleship classes, we provide
              platforms for believers to be enlightened and empowered.
            </p>
          </div>

          <Link
            href="/programmes"
            className="inline-flex items-center gap-3 px-8 py-4 bg-transparent border border-text/10 text-text/60 hover:text-accent hover:border-accent transition-all text-xs font-bold uppercase tracking-[0.3em] rounded-sm group"
          >
            Explore All <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Programs Grid: Module Style */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-1 min-h-[400px]">
          {loading ? (
            <div className="col-span-full flex items-center justify-center py-32 border border-dashed border-text/10">
              <Loader2 className="animate-spin text-accent" size={32} />
            </div>
          ) : programmes.length > 0 ? (
            programmes.map((item, index) => {
              const dynamicStatus = getProgramStatus(item.schedule);
              const firstDay = item.schedule?.[0];
              const lastDay = item.schedule?.[item.schedule.length - 1];

              return (
                <div
                  key={item.id || index}
                  className="group relative p-8 bg-neutral-900/20 border border-text/10 hover:bg-neutral-900/50 transition-all duration-500 overflow-hidden"
                >
                  {/* Status Indicator */}
                  <div className="absolute top-0 right-0 p-4">
                    {dynamicStatus === "Upcoming" ? (
                      <div className="flex items-center gap-2 text-[10px] text-accent font-bold uppercase tracking-widest animate-pulse">
                        <Clock size={12} /> Live
                      </div>
                    ) : dynamicStatus === "Ongoing" ? (
                      <div className="flex items-center gap-2 text-[10px] text-green-500 font-bold uppercase tracking-widest animate-pulse">
                        <Zap size={12} fill="currentColor" /> Active
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-[10px] text-text/30 font-bold uppercase tracking-widest">
                        <CheckCircle size={12} /> Archive
                      </div>
                    )}
                  </div>

                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-12">
                      <span className="text-[10px] tracking-[0.3em] uppercase text-text/40 border border-text/20 px-2 py-1 group-hover:border-accent group-hover:text-accent transition-colors">
                        {item.tag || item.category}
                      </span>
                      <span className="text-text/20 font-mono text-xs">
                        P-0{index + 1}
                      </span>
                    </div>

                    <h4 className="text-2xl font-display text-text mb-2 group-hover:text-accent transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-accent/60 text-xs uppercase tracking-widest mb-6 font-bold flex items-center gap-2">
                      <MapPin size={12} strokeWidth={3} /> {item.location}
                    </p>

                    <p className="text-text/60 text-sm leading-relaxed mb-8 font-sans h-20 line-clamp-3">
                      {item.description}
                    </p>

                    {/* Date / Action Footer */}
                    <div className="flex items-center justify-between border-t border-text/5 pt-6">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2 text-text/40 text-[11px] font-mono uppercase">
                          <Calendar size={14} />
                          {firstDay ? `${firstDay.date}${item.schedule.length > 1 ? ` — ${lastDay.date}` : ''}` : item.date}
                        </div>
                        {firstDay?.startTime && <div className="text-[9px] text-text/20 font-mono uppercase pl-5">{firstDay.startTime} — {firstDay.endTime}</div>}
                      </div>
                      <Link 
                        href={`/programmes/${item.slug}`}
                        className="text-xs uppercase tracking-widest font-bold text-accent opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1"
                      >
                        Details <ArrowRight size={12} />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-32 border border-dashed border-text/10 space-y-4">
              <CalendarDays className="text-text/10" size={48} />
              <p className="text-text/30 font-display text-xl italic text-center">No engagements recorded in the archives.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
