import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface NavButtonProps {
  direction: "left" | "right";
  onClick: () => void;
}

const ImgButton = ({ direction, onClick }: NavButtonProps) => {
  const isLeft = direction === "left";

  const positionClasses = isLeft ? "left-4 md:left-8" : "right-4 md:right-8";

  const Icon = isLeft ? ChevronLeft : ChevronRight;
  const label = isLeft ? "Previous slide" : "Next slide";

  return (
    <button
      onClick={onClick}
      className={`absolute ${positionClasses} top-1/2 -translate-y-1/2 z-20 
                 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-3 
                 transition-all shadow-lg active:scale-95`}
      aria-label={label}
    >
      <Icon className="w-6 h-6 text-gray-900" />
    </button>
  );
};

export default ImgButton;
