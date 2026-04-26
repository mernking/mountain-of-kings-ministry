import React from "react";
import Image from "next/image";
import { Maximize2, Activity } from "lucide-react";

export default function SchematicBlock({ data }) {
  return (
    <div className="my-12 group">
      <div className="flex flex-col lg:flex-row border border-text/10 bg-neutral-900/10 rounded-sm overflow-hidden">
        {/* Schematic Viewport */}
        <div className="flex-1 relative min-h-[400px] bg-neutral-950 flex items-center justify-center p-8 overflow-hidden">
          {/* Blueprint Grid Overlay */}
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(var(--text) 0.5px, transparent 0.5px)",
              backgroundSize: "24px 24px",
            }}
          />

          <div className="relative w-full h-full aspect-video">
            <Image
              src={data.imageUrl}
              alt={data.label}
              fill
              className="object-contain grayscale group-hover:grayscale-0 transition-all duration-700"
            />
          </div>

          <button className="absolute bottom-4 right-4 p-2 bg-background/80 border border-text/10 text-text/40 hover:text-accent transition-colors">
            <Maximize2 size={16} />
          </button>
        </div>

        {/* Technical Specs Sidebar */}
        <div className="w-full lg:w-72 border-l border-text/10 p-6 bg-neutral-900/30">
          <div className="flex items-center gap-2 mb-6 text-accent">
            <Activity size={14} />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
              Engineering Specs
            </span>
          </div>
          <div className="space-y-4">
            {data.technicalSpecs?.map((spec, i) => (
              <div key={i} className="border-b border-text/5 pb-2">
                <p className="text-[9px] uppercase text-text/30 tracking-widest mb-1">
                  {spec.key}
                </p>
                <p className="text-sm font-mono text-text/80">{spec.value}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-[10px] italic text-text/40 leading-relaxed font-sans">
            {data.label}
          </p>
        </div>
      </div>
    </div>
  );
}
