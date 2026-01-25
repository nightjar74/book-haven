import { useState, useEffect, useCallback } from "react";

interface UseCarouselProps {
  itemCount: number;
  autoPlayInterval?: number;
}

export const useHeroCarousel = ({
  itemCount,
  autoPlayInterval = 5000,
}: UseCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === itemCount - 1 ? 0 : prevIndex + 1
    );
  }, [itemCount]);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? itemCount - 1 : prevIndex - 1
    );
  }, [itemCount]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (!autoPlayInterval) return;

    const interval = setInterval(() => {
      goToNext();
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [goToNext, autoPlayInterval]);

  return {
    currentIndex,
    goToNext,
    goToPrevious,
    goToSlide,
  };
};
