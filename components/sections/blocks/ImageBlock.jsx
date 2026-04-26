import React from "react";
import Image from "next/image";

export default function ImageBlock({ data }) {
  return (
    <div className="my-16 flex flex-col items-center group">
      <div className="relative w-full aspect-[16/9] md:aspect-[21/9] border border-text/10 bg-neutral-900 overflow-hidden rounded-sm">
        {/* Subtle Gold Corner Accents */}
        <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-accent/20 z-10 transition-all group-hover:scale-110" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-accent/20 z-10 transition-all group-hover:scale-110" />

        <Image
          src={data.url}
          alt={data.caption || "MOKM Program Image"}
          fill
          className="object-cover grayscale hover:grayscale-0 transition-all duration-1000 ease-in-out scale-105 group-hover:scale-100"
        />
        
        {/* Soft Vignette Overlay */}
        <div className="absolute inset-0 bg-radial-[circle_at_center,_transparent_0%,_var(--background)_120%] opacity-40" />
      </div>

      {data.caption && (
        <div className="mt-6 flex items-center gap-4">
          <div className="h-px w-8 bg-accent/30" />
          <p className="text-[10px] uppercase tracking-[0.3em] text-text/40 font-mono italic">
            {data.caption}
          </p>
          <div className="h-px w-8 bg-accent/30" />
        </div>
      )}
    </div>
  );
}