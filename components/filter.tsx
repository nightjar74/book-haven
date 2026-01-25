"use client";
import { useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { FilterContent } from "@/components/filterContent";
import { useFilterParams } from "@/hooks/useFilterParams";

export default function Filter({
  authors,
  genres,
}: {
  authors: string[];
  genres: string[];
}) {
  const [menuOpen, setMenuOpen] = useState<"authors" | "genres" | null>(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const { currentAuthor, currentGenre, applyFilter } = useFilterParams(
    "/category/All%20Books",
  );

  const handleApply = (type: "author" | "genre", value: string) => {
    applyFilter(type, value);
    setIsMobileOpen(false);
  };

  const filterProps = {
    authors,
    genres,
    currentAuthor,
    currentGenre,
    menuOpen,
    setMenuOpen,
    onApply: handleApply,
  };

  return (
    <>
      <div className="hidden md:block">
        <FilterContent {...filterProps} />
      </div>
      <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
        <SheetTrigger asChild>
          <Button
            variant={"ghost"}
            size="icon"
            className="text-black ml-2 md:hidden"
          >
            <SlidersHorizontal style={{ width: 25, height: 25 }} />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="bg-white">
          <SheetTitle className="mb-4">Filter</SheetTitle>
          <FilterContent {...filterProps} />
        </SheetContent>
      </Sheet>
    </>
  );
}
