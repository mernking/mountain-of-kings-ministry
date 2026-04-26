import React from "react";
import Link from "next/link";
import {
  MessageSquare,
  Zap,
  ShieldAlert,
  HeartHandshake,
  Microscope,
} from "lucide-react";

const dispatchReasons = [
  {
    title: "Invite for Ministration",
    description:
      "Request the ministry for global crusades, speaking engagements, or marketplace seminars.",
    icon: MessageSquare,
    param: "invitation",
    tag: "External",
  },
  {
    title: "Innovative Solutions",
    description:
      "Report complex problems that require engineering, software, or divine strategic solutions.",
    icon: Microscope,
    param: "innovation",
    tag: "Technical",
  },
  {
    title: "Spiritual Support",
    description:
      "Reach out for prayers, counseling, or to join our discipleship and mentoring classes.",
    icon: HeartHandshake,
    param: "support",
    tag: "Ministry",
  },
  {
    title: "Report a Case",
    description:
      "Flag urgent community needs, supply shortages, or issues requiring ministry intervention.",
    icon: ShieldAlert,
    param: "report",
    tag: "Urgent",
  },
];

export default function ContactDispatch() {
  return (
    <section className="py-24 px-6 bg-background relative border-t border-text/5">
      {/* Decorative Glow background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-px bg-accent/20 blur-xl opacity-20" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-accent text-sm font-bold uppercase tracking-[0.4em] mb-4">
            Connect With The Throne
          </h2>
          <h3 className="text-4xl md:text-6xl font-display text-text italic">
            How can we serve you?
          </h3>
          <p className="mt-6 text-text/50 max-w-xl mx-auto font-sans text-sm md:text-base">
            Select a pathway below to ensure your request reaches the right
            department within the Mountain of Kings Ministries.
          </p>
        </div>

        {/* Dispatch Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {dispatchReasons.map((item, index) => (
            <Link
              key={index}
              href={`/contact?reason=${item.param}`}
              className="group relative p-8 bg-neutral-900/30 border border-text/10 hover:border-accent/40 hover:bg-neutral-900/60 transition-all duration-500 rounded-sm flex flex-col justify-between h-[320px]"
            >
              {/* Icon & Tag */}
              <div>
                <div className="flex justify-between items-start mb-8">
                  <div className="p-3 bg-background border border-text/5 text-text group-hover:text-accent group-hover:border-accent/30 transition-all">
                    <item.icon size={24} strokeWidth={1.5} />
                  </div>
                  <span className="text-[9px] font-mono uppercase tracking-widest text-text/30 group-hover:text-accent/50 transition-colors">
                    {item.tag}
                  </span>
                </div>

                <h4 className="text-xl font-display text-text mb-3 leading-tight group-hover:text-accent transition-colors">
                  {item.title}
                </h4>
                <p className="text-text/50 text-xs leading-relaxed font-sans">
                  {item.description}
                </p>
              </div>

              {/* Action Link */}
              <div className="flex items-center gap-2 mt-6">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0">
                  Open Channel
                </span>
                <div className="h-px flex-1 bg-text/10 group-hover:bg-accent/30 transition-colors" />
              </div>
            </Link>
          ))}
        </div>

        {/* Global Reach Footer */}
        <div className="mt-16 flex justify-center">
          <div className="inline-flex items-center gap-4 px-6 py-3 rounded-full border border-text/5 bg-neutral-900/40 text-text/60 text-[10px] uppercase tracking-[0.3em]">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            Active Channels for Global Ministration & Innovation
          </div>
        </div>
      </div>
    </section>
  );
}
