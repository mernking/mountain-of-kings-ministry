import React from "react";

export default function TextBlock({ data }) {
  return (
    <div className="my-10 max-w-3xl mx-auto">
      {/* Optional Subheading for sections */}
      {data.subheading && (
        <h4 className="text-accent text-[10px] uppercase tracking-[0.4em] font-bold mb-4">
          {data.subheading}
        </h4>
      )}
      
      <p className="text-text/80 text-lg md:text-xl font-sans leading-relaxed selection:bg-accent selection:text-background">
        {data.value}
      </p>
    </div>
  );
}