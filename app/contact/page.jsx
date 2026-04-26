"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  Mail,
  Phone,
  Send,
  Crown,
  Cog,
  Bird,
  TriangleAlert,
  Loader2,
} from "lucide-react";
import Programs from "@/components/sections/Programs";
import { toast } from "react-toastify";

const contactOptions = [
  { id: "invitation", label: "Ministration", icon: Crown },
  { id: "innovation", label: "Innovation", icon: Cog },
  { id: "support", label: "Support", icon: Bird },
  { id: "report", label: "Report", icon: TriangleAlert },
];

function ContactForm() {
  const searchParams = useSearchParams();
  const [reason, setReason] = useState("invitation");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  // Sync state with URL query params
  useEffect(() => {
    const r = searchParams.get("reason");
    if (r && contactOptions.find((opt) => opt.id === r)) {
      setReason(r);
    }
  }, [searchParams]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/v1/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          reason,
          subject: formData.subject || `Inquiry: ${reason.toUpperCase()}`,
        }),
      });

      if (!response.ok) throw new Error("Failed to dispatch message");

      toast.success("Message dispatched successfully to the throne!");
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (error) {
      toast.error("Failed to connect. Please try again.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="min-h-screen bg-background pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Area */}
        <div className="mb-16">
          <h1 className="text-5xl md:text-7xl font-display text-text italic mb-4">
            Contact Us
          </h1>
          <p className="text-text/50 font-sans tracking-widest uppercase text-xs">
            Establish a connection with MOKM
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Left Side: Manual Switchboard & Info */}
          <div className="lg:col-span-4 space-y-12">
            <div>
              <h3 className="text-accent text-xs font-bold uppercase tracking-[0.3em] mb-6">
                Select Purpose
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {contactOptions.map((opt) => {
                  const Icon = opt.icon;
                  return (
                    <button
                      key={opt.id}
                      onClick={() => setReason(opt.id)}
                      className={`p-4 border transition-all duration-300 text-left rounded-sm flex flex-col gap-2 ${
                        reason === opt.id
                          ? "border-accent bg-accent/5 text-accent"
                          : "border-text/10 bg-neutral-900/20 text-text/40 hover:border-text/30"
                      }`}
                    >
                      <span className="text-xl">
                        <Icon />
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-widest">
                        {opt.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-6 border-t border-text/5 pt-10">
              <div className="flex items-center gap-4 text-text/60 group">
                <div className="w-10 h-10 rounded-full border border-text/10 flex items-center justify-center group-hover:border-accent transition-colors">
                  <Mail size={16} className="group-hover:text-accent" />
                </div>
                <span className="text-sm font-mono">contact@mokm.org</span>
              </div>
              <div className="flex items-center gap-4 text-text/60 group">
                <div className="w-10 h-10 rounded-full border border-text/10 flex items-center justify-center group-hover:border-accent transition-colors">
                  <Phone size={16} className="group-hover:text-accent" />
                </div>
                <span className="text-sm font-mono">+234 (0) 000 000 000</span>
              </div>
            </div>
          </div>

          {/* Right Side: The Dynamic Form */}
          <div className="lg:col-span-8">
            <div className="p-8 md:p-12 bg-neutral-900/20 border border-text/10 rounded-sm">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] uppercase tracking-[0.3em] text-accent font-bold">
                      Full Name
                    </label>
                    <input
                      required
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="bg-transparent border-b border-text/20 py-3 text-text focus:outline-none focus:border-accent transition-colors font-sans"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] uppercase tracking-[0.3em] text-accent font-bold">
                      Email Address
                    </label>
                    <input
                      required
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className="bg-transparent border-b border-text/20 py-3 text-text focus:outline-none focus:border-accent transition-colors font-sans"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] uppercase tracking-[0.3em] text-accent font-bold">
                      Phone / WhatsApp Line
                    </label>
                    <input
                      required
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+234 ..."
                      className="bg-transparent border-b border-text/20 py-3 text-text focus:outline-none focus:border-accent transition-colors font-sans"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] uppercase tracking-[0.3em] text-accent font-bold">
                      {reason === "innovation"
                        ? "Domain"
                        : reason === "invitation"
                          ? "Location"
                          : "Subject"}
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder={
                        reason === "innovation"
                          ? "e.g. Clean Energy"
                          : "e.g. London, UK"
                      }
                      className="bg-transparent border-b border-text/20 py-3 text-text focus:outline-none focus:border-accent transition-colors font-sans"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase tracking-[0.3em] text-accent font-bold">
                    {reason === "report" ? "Report Details" : "Your Message"}
                  </label>
                  <textarea
                    required
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    placeholder={
                      reason === "innovation"
                        ? "Describe the problem that needs a solution..."
                        : "Tell us more..."
                    }
                    className="bg-transparent border border-text/20 p-4 text-text focus:outline-none focus:border-accent transition-colors font-sans resize-none"
                  />
                </div>

                <button
                  disabled={isSubmitting}
                  className="w-full py-5 bg-accent text-background font-bold uppercase tracking-[0.4em] text-xs hover:bg-white transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <Loader2 className="animate-spin" size={14} />
                  ) : (
                    <>
                      Dispatch Message <Send size={14} />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <ContactForm />
      <Programs />
    </Suspense>
  );
}
