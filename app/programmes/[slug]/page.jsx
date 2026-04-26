import React from "react";
import { Calendar, MapPin, Users, ArrowLeft, Clock, Zap } from "lucide-react";
import Link from "next/link";
import BlockRenderer from "@/components/sections/BlockRenderer";
import ShareButton from "@/components/fragments/ShareButton";
import { notFound } from "next/navigation";

async function getProgramme(slug) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/v1/programmes?limit=100`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) return null;

  const json = await res.json();
  return json.data.find((p) => p.slug === slug);
}

const getProgramStatus = (schedule) => {
  if (!schedule || schedule.length === 0) return "Upcoming";
  const now = new Date();
  const sortedSchedule = [...schedule].sort(
    (a, b) =>
      new Date(`${a.date}T${a.startTime || "00:00"}`) -
      new Date(`${b.date}T${b.startTime || "00:00"}`),
  );
  const startOfEvent = new Date(
    `${sortedSchedule[0].date}T${sortedSchedule[0].startTime || "00:00"}`,
  );
  const endOfEvent = new Date(
    `${sortedSchedule[sortedSchedule.length - 1].date}T${sortedSchedule[sortedSchedule.length - 1].endTime || "23:59"}`,
  );
  if (now < startOfEvent) return "Upcoming";
  if (now >= startOfEvent && now <= endOfEvent) return "Ongoing";
  return "Completed";
};

export default async function ProgramDetails({ params }) {
  const { slug } = await params;
  const program = await getProgramme(slug);

  if (!program) {
    notFound();
  }

  const dynamicStatus = getProgramStatus(program.schedule);

  return (
    <main className="min-h-screen bg-background pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <Link
            href="/programmes"
            className="inline-flex items-center gap-2 text-accent text-[10px] font-bold uppercase tracking-widest hover:opacity-70"
          >
            <ArrowLeft size={14} /> Back to Programmes
          </Link>
          <ShareButton title={program.title} text={program.description} />
        </div>

        <header className="mb-16 border-b border-text/5 pb-12">
          <div className="flex items-center gap-4 mb-6">
            <span className="px-2 py-0.5 border border-accent/30 text-accent font-mono text-[10px] uppercase tracking-[0.3em]">
              {program.category}
            </span>
            <span
              className={`px-2 py-0.5 font-bold text-[9px] uppercase tracking-widest ${
                dynamicStatus === "Upcoming"
                  ? "bg-accent text-background"
                  : dynamicStatus === "Ongoing"
                    ? "bg-green-500 text-background animate-pulse"
                    : "bg-white/10 text-text/40"
              }`}
            >
              {dynamicStatus}
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-display text-text italic mb-8 leading-tight">
            {program.title}
          </h1>

          <div className="flex flex-wrap gap-8 items-center text-text/60">
            <div className="flex items-center gap-3">
              <MapPin size={18} className="text-accent" />
              <span className="text-sm font-sans uppercase tracking-wider">
                {program.location}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Zap size={18} className="text-accent" />
              <span className="text-sm font-sans uppercase tracking-wider text-accent font-bold">
                {program.schedule?.length || 1}{" "}
                {program.schedule?.length === 1
                  ? "Day Engagement"
                  : "Day Gathering"}
              </span>
            </div>
          </div>
        </header>

        {/* Detailed Schedule Section */}
        {program.schedule?.length > 0 && (
          <div className="mb-16 space-y-4">
            <h3 className="text-accent text-[10px] font-bold uppercase tracking-[0.4em] mb-6">
              Event Timeline
            </h3>
            <div className="grid grid-cols-1 gap-2">
              {program.schedule.map((item, idx) => (
                <div
                  key={idx}
                  className="flex flex-col md:flex-row md:items-center justify-between p-6 bg-neutral-900/30 border border-white/5 rounded-sm group hover:border-accent/20 transition-all"
                >
                  <div className="flex items-center gap-6">
                    <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-text/30 font-mono text-xs group-hover:border-accent/30 group-hover:text-accent">
                      0{idx + 1}
                    </div>
                    <div>
                      <p className="text-lg font-display text-text leading-none">
                        {new Date(item.date).toLocaleDateString("en-US", {
                          weekday: "long",
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                      <p className="text-[10px] text-text/40 uppercase font-bold tracking-widest mt-2">
                        Engage Session
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 md:mt-0 flex items-center gap-4 text-accent/80 font-mono text-sm">
                    <Clock size={14} />
                    <span>
                      {item.startTime} — {item.endTime}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <article className="space-y-4">
          <BlockRenderer content={program.contentBlocks || []} />
        </article>

        <div className="mt-20 p-10 bg-neutral-900/40 border border-accent/20 text-center rounded-sm">
          <h3 className="text-2xl font-display text-text mb-4 uppercase">
            Want to host this program?
          </h3>
          <p className="text-text/60 text-sm mb-8 font-sans">
            Contact us for ministrations and global outreach collaborations.
          </p>
          <Link
            href="/contact?reason=invitation"
            className="inline-block px-10 py-4 bg-accent text-background font-bold text-xs uppercase tracking-[0.4em] hover:bg-white transition-all"
          >
            Send Invitation
          </Link>
        </div>
      </div>
    </main>
  );
}
