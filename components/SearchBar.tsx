"use client";

import { useState, useEffect, useRef, use } from "react";
import { useRouter } from "next/navigation";
import BookCard from "@/components/BookCard";
import { useBookSearch } from "@/hooks/useBookSearch";
import SearchButton from "./ui/searchButton";
import { X } from "lucide-react";

const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");

export default function SearchBar() {
  const router = useRouter();

  const [query, setQuery] = useState("");
  const [highlightIndex, setHighlightIndex] = useState(0);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { results, showMenu, setShowMenu } = useBookSearch(query);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showMenu || results.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightIndex((prev) => (prev + 1) % results.length);
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightIndex((prev) => (prev === 0 ? results.length - 1 : prev - 1));
    }

    if (e.key === "Enter") {
      const book = results[highlightIndex];
      router.push(`/books/${slugify(book.title)}`);
      setShowMenu(false);
    }
  };

  const handleSearchClick = () => {
    if (query.length === 0) return;
    const book = results[highlightIndex];
    router.push(`/books/${book.id}`);
    setShowMenu(false);
  };

  return (
    <div className="relative w-full max-w-[550px]" ref={containerRef}>
      <div className="flex flex-row">
        <input
          className="w-full h-[45px] bg-white border border-r-0 text-black px-4 py-2 focus:outline-none"
          placeholder="Search books..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setHighlightIndex(0);
          }}
          onKeyDown={handleKeyDown}
          onFocus={() => query.length > 1 && setShowMenu(true)}
        />
        <div className="bg-white w-12 px-[2px] py-[2px]">
          <button
            onClick={() => setQuery("")}
            className="h-full w-full flex items-center justify-center bg-white"
          >
            <X size={22} color="gray" />
          </button>
        </div>
        <SearchButton onClick={handleSearchClick} />
      </div>

      {showMenu && results.length > 0 && (
        <div className="absolute w-full bg-white border-[#9d3128] border shadow-xl z-50 max-h-80 overflow-y-auto">
          {results.map((book, i) => (
            <div
              key={book.id}
              onClick={() => {
                router.replace(`/books/${slugify(book.title)}`);
                setShowMenu(false);
              }}
              className={`flex items-center gap-3 px-3 py-4 cursor-pointer ${
                highlightIndex === i ? "bg-rose-100" : "hover:bg-rose-100"
              }`}
            >
              <div className="h-12 w-10 rounded overflow-hidden">
                <BookCard {...book} thumbnail={true} />
              </div>

              <span className="text-black">{book.title}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
