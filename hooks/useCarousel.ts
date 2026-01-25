"use client";
import { max } from "drizzle-orm";
import React, { useState } from "react";

interface UseCarouselProps {
  totalItems: number;
  itemsPerView?: number;
}

export const useCarousel = ({
  totalItems,
  itemsPerView = 0,
}: UseCarouselProps) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollRef = React.useRef<HTMLUListElement>(null);

  const handlePrevious = () => {
    if (scrollRef.current) {
      const itemWidth = scrollRef.current.scrollWidth / totalItems;

      // If at the beginning, wrap to the end
      if (scrollPosition === 0) {
        itemsPerView = itemWidth < 170 ? 2 : 7;
        const newPosition = totalItems - itemsPerView;
        setScrollPosition(newPosition);
        scrollRef.current.scrollTo({
          left: itemWidth * newPosition,
          behavior: "smooth",
        });
      } else {
        const newPosition = scrollPosition - 1;
        setScrollPosition(newPosition);
        scrollRef.current.scrollTo({
          left: itemWidth * newPosition,
          behavior: "smooth",
        });
      }
    }
  };

  const handleNext = () => {
    if (scrollRef.current) {
      const itemWidth = scrollRef.current.scrollWidth / totalItems;
      itemsPerView = itemWidth < 170 ? 2 : 7;
      const maxScroll = totalItems - itemsPerView;
      /*       console.log(
        itemsPerView,
        scrollPosition,
        maxScroll,
        itemWidth,
        "itemsperview, scrollpos, maxScroll, itemWidth",
      ); */

      // If at the end, wrap to the beginning
      if (scrollPosition >= maxScroll) {
        setScrollPosition(0);
        scrollRef.current.scrollTo({
          left: 0,
          behavior: "smooth",
        });
      } else {
        const newPosition = scrollPosition + 1;
        setScrollPosition(newPosition);
        scrollRef.current.scrollTo({
          left: itemWidth * newPosition,
          behavior: "smooth",
        });
      }
    }
  };

  const canGoPrevious = true;
  const canGoNext = true;

  return {
    scrollRef,
    scrollPosition,
    handlePrevious,
    handleNext,
    canGoPrevious,
    canGoNext,
  };
};
