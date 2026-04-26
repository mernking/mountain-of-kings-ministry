"use client";

import React, { useState } from "react";
import { Plus, Minus, Search, MessageCircle, HelpCircle } from "lucide-react";
import Link from "next/link";

const FAQ_DATA = [
  {
    category: "General Ministry",
    questions: [
      {
        q: "What is the core mission of MOKM?",
        a: "Our mission is to teach and raise quality believers of Christ both in the marketplace and in the church, bringing divine innovation to the world through the love of God."
      },
      {
        q: "What does 'Mountain of Kings' signify?",
        a: "It represents a high place of authority and spiritual growth where believers are trained to reign as kings in their specific professional and spiritual domains, as inspired by Psalm 21."
      }
    ]
  },
  {
    category: "Innovation & Projects",
    questions: [
      {
        q: "How does MOKM support engineering and science?",
        a: "We provide a platform for 'Solution Provision.' This involves developing open-source schematics, software, and engineering blueprints that solve real-world problems using Kingdom principles."
      },
      {
        q: "Can I collaborate on a technical project?",
        a: "Yes. We encourage marketplace apostles to reach out via our contact page under the 'Innovation' pathway to propose or contribute to ongoing technical solutions."
      }
    ]
  },
  {
    category: "Ministrations & Programs",
    questions: [
      {
        q: "How can I invite the ministry for a crusade or seminar?",
        a: "You can use our Contact Dispatch center and select 'Invite for Ministration.' We are open to global engagements for both spiritual and marketplace-focused programs."
      },
      {
        q: "Are the discipleship classes open to everyone?",
        a: "Yes. We offer various tiers of discipleship and mentoring designed to help every believer grow and wax stronger in the Spirit."
      }
    ]
  }
];

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <main className="min-h-screen bg-background pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 border border-accent/20 rounded-full mb-6">
            <HelpCircle size={14} className="text-accent" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent">Knowledge Base</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-display text-text italic mb-6">Frequently Asked</h1>
          <p className="text-text/50 max-w-lg mx-auto font-sans">
            Find clarity on our spiritual mission, technical projects, and how to engage with the MOKM community.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative mb-16 max-w-xl mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text/20" size={18} />
          <input 
            type="text"
            placeholder="Search for answers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-neutral-900/40 border border-text/10 py-4 pl-12 pr-4 text-text focus:outline-none focus:border-accent transition-all text-sm font-sans rounded-sm"
          />
        </div>

        {/* FAQ Accordion Sections */}
        <div className="space-y-12">
          {FAQ_DATA.map((section, sIndex) => (
            <div key={sIndex} className="animate-in fade-in slide-in-from-bottom-4">
              <h3 className="text-accent text-xs font-bold uppercase tracking-[0.4em] mb-6 border-b border-text/5 pb-4">
                {section.category}
              </h3>
              <div className="space-y-1">
                {section.questions.map((item, qIndex) => {
                  const uniqueId = `${sIndex}-${qIndex}`;
                  const isOpen = openIndex === uniqueId;

                  return (
                    <div 
                      key={qIndex} 
                      className={`border border-text/5 transition-all duration-300 ${isOpen ? 'bg-neutral-900/30 border-accent/20' : 'bg-transparent hover:bg-neutral-900/10'}`}
                    >
                      <button 
                        onClick={() => toggleAccordion(uniqueId)}
                        className="w-full flex items-center justify-between p-6 text-left"
                      >
                        <span className={`text-lg font-display tracking-tight transition-colors ${isOpen ? 'text-accent' : 'text-text'}`}>
                          {item.q}
                        </span>
                        {isOpen ? <Minus size={18} className="text-accent" /> : <Plus size={18} className="text-text/20" />}
                      </button>
                      
                      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                        <div className="p-6 pt-0 text-text/60 font-sans leading-relaxed text-sm md:text-base border-t border-text/5">
                          {item.a}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Support CTA */}
        <div className="mt-24 p-10 bg-neutral-900/50 border border-dashed border-text/10 text-center rounded-sm">
          <MessageCircle size={32} className="mx-auto text-accent mb-6" />
          <h4 className="text-2xl font-display text-text mb-2">Still have questions?</h4>
          <p className="text-text/50 text-sm mb-8">Our team is available for specific inquiries regarding spiritual support or technical collaboration.</p>
          <Link 
            href="/contact" 
            className="inline-block px-8 py-3 bg-text text-background font-bold text-[10px] uppercase tracking-[0.3em] hover:bg-accent transition-colors"
          >
            Reach Out Directly
          </Link>
        </div>

      </div>
    </main>
  );
}