import React from "react";
import {
  Globe,
  Users,
  Lightbulb,
  GraduationCap,
  Heart,
  Rocket,
} from "lucide-react";

const services = [
  {
    title: "Open Crusades",
    description:
      "Proclaiming the Gospel of Christ across the globe, bringing salvation and healing to the masses.",
    icon: Globe,
  },
  {
    title: "Discipleship Classes",
    description:
      "Systematic teaching to raise quality believers who are grounded in the Word and spirit.",
    icon: GraduationCap,
  },
  {
    title: "Marketplace Ministry",
    description:
      "Empowering believers to be ambassadors of Christ and agents of innovation in the professional world.",
    icon: Rocket,
  },
  {
    title: "Mentorship",
    description:
      "One-on-one and group guidance to help believers grow and wax stronger in their spiritual walk.",
    icon: Users,
  },
  {
    title: "Divine Innovation",
    description:
      "Bringing creative solutions to the world's problems through the wisdom of the Body of Christ.",
    icon: Lightbulb,
  },
  {
    title: "Enriching Lives",
    description:
      "Demonstrating the love of God through projects that meet needs and touch hearts.",
    icon: Heart,
  },
];

export default function WhatWeDo() {
  return (
    <section className="py-24 px-6 bg-background relative overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-accent text-sm font-bold uppercase tracking-[0.4em] mb-4">
            Our Mission in Action
          </h2>
          <h3 className="text-4xl md:text-6xl font-display text-text italic">
            What We Do
          </h3>
          <div className="h-1 w-20 bg-accent mx-auto mt-6" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative p-10 bg-neutral-900/40 border border-text/10 rounded-sm transition-all duration-500 hover:border-accent/50 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
            >
              {/* Subtle Gradient Hover Overlay */}
              <div className="absolute inset-0 bg-linear-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                <div className="mb-6 inline-block p-4 rounded-sm bg-background border border-text/5 text-text group-hover:text-accent group-hover:border-accent/30 transition-colors duration-500">
                  <service.icon size={32} strokeWidth={1.5} />
                </div>

                <h4 className="text-2xl font-display text-text mb-4 tracking-tight group-hover:text-accent transition-colors">
                  {service.title}
                </h4>

                <p className="text-text/60 leading-relaxed font-sans text-sm md:text-base">
                  {service.description}
                </p>
              </div>

              {/* Corner Accent Detail */}
              <div className="absolute bottom-4 right-4 w-2 h-2 bg-text/10 group-hover:bg-accent rotate-45 transition-colors" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
