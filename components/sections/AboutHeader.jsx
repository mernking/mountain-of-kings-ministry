import React from "react";

export default function AboutHeader() {
  return (
    <section className="relative pt-32 pb-20 px-6 bg-background border-b border-text/5 overflow-hidden">
      {/* Background Decorative Text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none opacity-[0.02] whitespace-nowrap">
        <span className="font-display text-[20vw] text-text uppercase leading-none">
          MOUNTAIN OF KINGS
        </span>
      </div>

      <div className="max-w-7xl mx-auto relative z-10 text-center">
        <h2 className="text-accent text-sm font-bold uppercase tracking-[0.5em] mb-6">
          The Genesis
        </h2>
        <h1 className="text-5xl md:text-8xl font-display text-text italic leading-tight">
          About Us
        </h1>
        <div className="h-1 w-24 bg-accent mx-auto mt-8 shadow-[0_0_15px_var(--accent)]" />
      </div>
    </section>
  );
}