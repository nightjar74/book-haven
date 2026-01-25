"use client";

import { Search, Loader2, Plus, BookIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useBookImport } from "@/hooks/use-bookImport";

const BookSearch = () => {
  const {
    query,
    setQuery,
    results,
    isOpen,
    setIsOpen,
    isSearching,
    isImporting,
    containerRef,
    handleImport,
  } = useBookImport();

  return (
    <div className="relative w-fulls mb-7" ref={containerRef}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-400" />
        <Input
          onFocus={() => setIsOpen(true)}
          className="pl-10 h-12 shadow-sm text-sm md:text-[14px]"
          placeholder="Quick Add: Search by title or ISBN..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {isSearching && (
          <Loader2 className="absolute right-4 top-[28%] animate-spin h-5 w-5 text-primary" />
        )}
      </div>

      {isOpen && results.length > 0 && (
        <ul className="absolute z-50 w-full mt-2 bg-white border rounded-xl shadow-2xl overflow-hidden">
          {results.map((item) => (
            <li
              key={item.id}
              className="p-4 hover:bg-zinc-50 flex items-center justify-between border-b last:border-0"
            >
              <div className="flex items-center gap-4 overflow-hidden">
                {item.volumeInfo.imageLinks?.smallThumbnail ? (
                  <img
                    src={item.volumeInfo.imageLinks.smallThumbnail}
                    className="w-10 h-14 object-cover rounded shadow-sm"
                    alt="cover"
                  />
                ) : (
                  <div className="w-10 h-14 bg-zinc-100 flex items-center justify-center rounded">
                    <BookIcon className="w-4 h-4 text-zinc-400" />
                  </div>
                )}
                <div className="flex flex-col">
                  <span className="font-semibold truncate max-w-[250px]">
                    {item.volumeInfo.title}
                  </span>
                  <span className="text-sm text-zinc-500">
                    {item.volumeInfo.authors?.join(", ") || "Unknown Author"}
                  </span>
                </div>
              </div>

              <button
                onClick={() => handleImport(item.id)}
                disabled={!!isImporting}
                className="bg-primary/10 text-primary p-2 rounded-full hover:bg-primary hover:text-white transition-colors disabled:opacity-50"
              >
                {isImporting === item.id ? (
                  <Loader2 className="animate-spin h-5 w-5" />
                ) : (
                  <Plus className="h-5 w-5" />
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BookSearch;
