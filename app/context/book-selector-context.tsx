"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type BookSelectorContextType = {
  activeCardIndex: number;
  setActiveCardIndex: (index: number) => void;
  selections: Record<number, string[]>;
  clearSelections: () => void;
  toggleBookSelection: (bookId: string) => void;
};

const BookSelectorContext = createContext<BookSelectorContextType | undefined>(
  undefined,
);

export const BookSelectorProvider = ({
  children,
  initialData,
}: {
  children: React.ReactNode;
  initialData?: any[];
}) => {
  const [activeCardIndex, setActiveCardIndex] = useState<number>(0);

  const [selections, setSelections] = useState<Record<number, string[]>>(() => {
    if (!initialData) return { 0: [], 1: [], 2: [] };

    const initialMap: Record<number, string[]> = {};
    initialData.forEach((col, index) => {
      initialMap[index] = col.bookIds || [];
    });
    return initialMap;
  });

  const clearSelections = () => {
    setSelections((prev) => ({
      ...prev,
      [activeCardIndex]: [],
    }));
  };

  useEffect(() => {
    if (initialData) {
      const updatedMap: Record<number, string[]> = {};
      initialData.forEach((col, index) => {
        updatedMap[index] = col.bookIds || [];
      });
      setSelections(updatedMap);
    }
  }, [initialData]);

  const toggleBookSelection = (bookId: string) => {
    setSelections((prev) => {
      const currentSelections = prev[activeCardIndex] || [];
      const isSelected = currentSelections.includes(bookId);

      return {
        ...prev,
        [activeCardIndex]: isSelected
          ? currentSelections.filter((id) => id !== bookId)
          : [...currentSelections, bookId],
      };
    });
  };

  return (
    <BookSelectorContext.Provider
      value={{
        activeCardIndex,
        setActiveCardIndex,
        selections,
        toggleBookSelection,
        clearSelections,
      }}
    >
      {children}
    </BookSelectorContext.Provider>
  );
};

export const useBookSelector = () => {
  const context = useContext(BookSelectorContext);
  if (!context) throw new Error("useBookSelector must be used within Provider");
  return context;
};
