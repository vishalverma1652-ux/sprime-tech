import React, { useState, useEffect } from 'react';
import { MessageSquare, FileSpreadsheet, ArrowUp } from 'lucide-react';
import { COMPANY_INFO } from '../data/company';

interface FloatingActionsProps {
  boqCount: number;
  onOpenBoq: () => void;
}

export const FloatingActions: React.FC<FloatingActionsProps> = ({
  boqCount,
  onOpenBoq,
}) => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3 pointer-events-none">
      {/* Scroll to top button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="pointer-events-auto p-3 rounded-full bg-white text-slate-700 hover:text-slate-900 border border-slate-200 shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5 active:scale-95"
          aria-label="Scroll to top"
          title="Back to top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

      {/* Floating BOQ Cart button */}
      {boqCount > 0 && (
        <button
          onClick={onOpenBoq}
          className="pointer-events-auto flex items-center gap-2 py-3 px-4 rounded-full bg-[#0b1a33] text-white shadow-xl hover:bg-[#12284b] transition-all hover:scale-105 active:scale-95 border border-slate-700"
          title="Open Project BOQ"
        >
          <FileSpreadsheet className="w-5 h-5 text-amber-400" />
          <span className="text-xs font-bold hidden sm:inline">Project BOQ</span>
          <span className="w-5 h-5 rounded-full bg-amber-500 text-slate-950 font-black text-xs flex items-center justify-center">
            {boqCount}
          </span>
        </button>
      )}

      {/* Floating WhatsApp Quick Action Button */}
      <a
        href={`${COMPANY_INFO.whatsappUrl}?text=${encodeURIComponent(
          'Hello Sprime Tech,\nI am reaching out regarding bulk supply of meters / LED lighting for our project.'
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className="pointer-events-auto group relative flex items-center justify-center w-14 h-14 rounded-full bg-emerald-500 text-white shadow-xl hover:bg-emerald-400 hover:shadow-2xl hover:scale-110 active:scale-95 transition-all"
        aria-label="Chat on WhatsApp"
        title="Chat with Wholesale Sales on WhatsApp"
      >
        <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-400 border-2 border-white animate-pulse"></span>
        <MessageSquare className="w-7 h-7 fill-white" />

        {/* Hover Tooltip */}
        <span className="absolute right-16 px-3 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-md">
          Chat on WhatsApp (+91 81306 69395)
        </span>
      </a>
    </div>
  );
};
