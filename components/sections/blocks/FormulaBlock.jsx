import React from "react";
import { Binary } from "lucide-react";
// Optional: import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from "react-katex";

export default function FormulaBlock({ data }) {
  return (
    <div className="my-10 p-8 border-l-2 border-accent bg-neutral-900/20 flex flex-col md:flex-row items-center gap-8 group">
      <div className="flex-shrink-0 w-12 h-12 rounded-full border border-accent/20 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-background transition-all duration-500">
        <Binary size={20} />
      </div>

      <div className="flex-1 text-center md:text-left">
        <div className="text-2xl md:text-3xl text-text font-mono mb-4 overflow-x-auto py-2">
          {/* If using KaTeX: <BlockMath math={data.latex} /> */}
          <BlockMath math={data.latex} />
          {/* {data.latex}  */}
        </div>
        <p className="text-text/40 text-xs uppercase tracking-[0.2em] font-sans">
          {data.description}
        </p>
      </div>
    </div>
  );
}
