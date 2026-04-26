import React from "react";
import { ShieldCheck, Cpu, Heart } from "lucide-react";

export default function AboutContent() {
  return (
    <section className="py-24 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Left Side: The Scripture & Pillar */}
          <div className="lg:col-span-5 space-y-12">
            <div className="p-8 border border-text/10 bg-neutral-900/20 rounded-sm relative group">
              <div className="absolute top-0 right-0 p-4 font-mono text-accent/20 group-hover:text-accent/50 transition-colors">
                PS-21
              </div>
              <h3 className="text-accent text-xs font-bold uppercase tracking-[0.3em] mb-6">
                Foundational Scripture
              </h3>
              <p className="text-2xl md:text-3xl font-display text-text leading-relaxed italic">
                "The king shall joy in thy strength, O LORD; and in thy
                salvation how greatly shall he rejoice!"
              </p>
              <p className="mt-4 text-text/40 text-sm font-sans">
                — Psalm 21:1
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex gap-6 items-start">
                <div className="p-3 bg-accent/10 rounded-full text-accent mt-1">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <h4 className="text-text font-bold uppercase tracking-widest text-sm mb-2">
                    Quality Believers
                  </h4>
                  <p className="text-text/60 text-sm leading-relaxed font-sans">
                    We focus on depth over distance. Raising believers who are
                    not just followers, but experts and pillars in their
                    respective fields.
                  </p>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="p-3 bg-accent/10 rounded-full text-accent mt-1">
                  <Cpu size={20} />
                </div>
                <div>
                  <h4 className="text-text font-bold uppercase tracking-widest text-sm mb-2">
                    Divine Innovation
                  </h4>
                  <p className="text-text/60 text-sm leading-relaxed font-sans">
                    The body of Christ should lead in science, tech, and
                    engineering. We provide the spiritual environment for
                    technical solutions to be birthed.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Detailed Narrative */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-8">
            <div className="space-y-6 text-text/70 font-sans text-lg leading-loose">
              <p>
                Mountain of Kings Ministries (MOKM) is not just a place of
                worship; it is an engine of transformation. We believe that the
                love of God, which passes all knowledge, is the ultimate
                catalyst for human innovation.
              </p>

              <p>
                Our mission is twofold: to **teach and raise quality believers**
                within the church, and to empower those same believers to be the
                **head of their industries** in the marketplace. We bridge the
                gap between ancient spiritual truths and modern engineering
                challenges.
              </p>

              <blockquote className="border-l-2 border-accent pl-6 py-2 my-8 italic text-text text-xl font-display">
                "Enriching lives with the love of God that gives the fullness of
                God."
              </blockquote>

              <p>
                Whether through our open crusades, intensive discipleship
                classes, or our technical solution projects, everything we do is
                aimed at making the world see the wisdom of the Kingdom in
                practical, tangible ways.
              </p>
            </div>

            {/* Stats / Impact Bar */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 pt-10 border-t border-text/10">
              <div>
                <p className="text-3xl font-display text-accent">Global</p>
                <p className="text-[10px] uppercase tracking-[0.2em] text-text/40">
                  Reach
                </p>
              </div>
              <div>
                <p className="text-3xl font-display text-accent">24/7</p>
                <p className="text-[10px] uppercase tracking-[0.2em] text-text/40">
                  Innovation
                </p>
              </div>
              <div>
                <p className="text-3xl font-display text-accent">Psalm 21</p>
                <p className="text-[10px] uppercase tracking-[0.2em] text-text/40">
                  Core Vision
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
