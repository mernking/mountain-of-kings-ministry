import React from "react";

export default function ScrollingMarquee({ data, speed = "40s" }) {
  
  // We double the data array to create the seamless infinite loop effect
  const displayData = [...data, ...data];

  return (
    <section className="relative py-10 md:py-16 bg-background border-y border-text/5 overflow-hidden">
      <div className="flex overflow-hidden select-none">
        
        {/* The Animated Container */}
        <div 
          className="flex items-center whitespace-nowrap animate-infinite-scroll"
          style={{ animationDuration: speed }}
        >
          {displayData.map((item, index) => (
            <div key={index} className="flex items-center gap-12 md:gap-24 px-6 md:px-12">
              
              {/* Text Styled with MOKM Colors */}
              <span className="text-3xl md:text-6xl font-display tracking-tighter text-text uppercase">
                {item}
              </span>
              
              {/* The "Dot" Separator using your Accent Gold */}
              <div className="w-2 h-2 md:w-4 md:h-4 rounded-full bg-accent shadow-[0_0_12px_rgba(255,215,0,0.4)]" />
              
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
}