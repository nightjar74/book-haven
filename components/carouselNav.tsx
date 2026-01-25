import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CarouselNavProps {
  onPrevious: () => void;
  onNext: () => void;
  canGoPrevious?: boolean;
  canGoNext?: boolean;
  className?: string;
}

export const CarouselNav = ({
  onPrevious,
  onNext,
  canGoPrevious = true,
  canGoNext = true,
  className = "",
}: CarouselNavProps) => {
  return (
    <div className={`flex gap-2 ${className}`}>
      <button
        onClick={onPrevious}
        disabled={!canGoPrevious}
        className="w-10 h-10 flex items-center justify-center bg-white hover:bg-slate-100 border border-slate-300 rounded-sm disabled:bg-white disabled:opacity-50 disabled:cursor-not-allowed text-slate-500 transition-colors"
        aria-label="Previous"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={onNext}
        disabled={!canGoNext}
        className="w-10 h-10 flex items-center justify-center bg-white hover:bg-slate-100 border border-slate-300 rounded-sm disabled:bg-white disabled:opacity-50 disabled:cursor-not-allowed text-slate-500 transition-colors"
        aria-label="Next"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
};
