"use client";

import React, { useState } from "react";
import { Share2, Check } from "lucide-react";
import { toast } from "react-toastify";

export default function ShareButton({ title, text }) {
  const [shared, setShared] = useState(false);

  const handleShare = async () => {
    const shareData = {
      title: title || "MOKM",
      text: text || "Check this out from Mountain of Kings Ministries",
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setShared(true);
        toast.success("Link copied to clipboard!");
        setTimeout(() => setShared(false), 2000);
      }
    } catch (err) {
      // User cancelled or browser error
      console.error("Error sharing:", err);
    }
  };

  return (
    <button 
      onClick={handleShare}
      className={`p-2 border border-text/10 transition-all rounded-sm flex items-center justify-center ${shared ? 'text-accent border-accent' : 'text-text/40 hover:text-accent hover:border-accent'}`}
      title="Share"
    >
      {shared ? <Check size={18} /> : <Share2 size={18} />}
    </button>
  );
}
