import React from "react";

type IndicatorShape = "circle" | "square" | "pill" | "rectangle";

interface IndicatorProps {
  isActive: boolean;
  onClick: () => void;
  index: number;
  shape?: IndicatorShape;
}

const Indicator = ({
  isActive,
  onClick,
  index,
  shape = "circle",
}: IndicatorProps) => {
  const shapeStyles: Record<IndicatorShape, string> = {
    circle: "w-3 h-3 rounded-full",
    square: "w-3 h-3 rounded-none",
    pill: "w-6 h-2 rounded-full",
    rectangle: "w-6 h-2 rounded-none",
  };

  const activeStyles = isActive
    ? "bg-gray-700 w-8"
    : "bg-gray-300 hover:bg-gray-400";

  return (
    <button
      onClick={onClick}
      className={`${shapeStyles[shape]} transition-all duration-300 ${activeStyles}`}
      aria-label={`Go to slide ${index + 1}`}
      aria-current={isActive ? "step" : undefined}
    />
  );
};

export default Indicator;
