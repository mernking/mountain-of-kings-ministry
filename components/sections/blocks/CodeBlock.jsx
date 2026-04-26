import React from "react";
import { Terminal, Copy } from "lucide-react";

export default function CodeBlock({ data }) {
  return (
    <div className="my-8 rounded-sm overflow-hidden border border-text/10 bg-neutral-950 shadow-2xl">
      {/* Terminal Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-neutral-900 border-b border-text/5">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/20" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/20" />
          </div>
          <div className="h-4 w-px bg-text/10 mx-2" />
          <div className="flex items-center gap-2 text-text/40">
            <Terminal size={12} />
            <span className="text-[10px] font-mono tracking-wider">{data.fileName || 'source_module'}</span>
          </div>
        </div>
        <button className="text-text/30 hover:text-accent transition-colors">
          <Copy size={14} />
        </button>
      </div>

      {/* Code Area */}
      <div className="p-6 overflow-x-auto">
        <pre className="font-mono text-sm leading-relaxed text-accent/90">
          <code>{data.code}</code>
        </pre>
      </div>
    </div>
  );
}