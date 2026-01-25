"use client";
import { motion, AnimatePresence } from "framer-motion";

interface FilterContentProps {
  authors: string[];
  genres: string[];
  currentAuthor: string;
  currentGenre: string;
  menuOpen: "authors" | "genres" | null;
  setMenuOpen: (val: "authors" | "genres" | null) => void;
  onApply: (type: "author" | "genre", value: string) => void;
}

export function FilterContent({
  authors,
  genres,
  currentAuthor,
  currentGenre,
  menuOpen,
  setMenuOpen,
  onApply,
}: FilterContentProps) {
  return (
    <div className="flex flex-col gap-2 w-full max-w-xs">
      <button
        className="px-4 py-2 bg-orange-50 text-black text-left flex items-center gap-2"
        onClick={() => setMenuOpen(menuOpen === "genres" ? null : "genres")}
      >
        <span className="text-lg">{menuOpen === "genres" ? "−" : "+"}</span>
        <span>Books</span>
      </button>
      <AnimatePresence>
        {menuOpen === "genres" && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden flex flex-col gap-2 pl-6"
          >
            {genres.map((g) => (
              <button
                key={g}
                onClick={() => onApply("genre", g)}
                className={`px-4 py-2 text-left ${
                  currentGenre === g
                    ? "bg-[#77211a] text-white"
                    : "bg-orange-50 text-black hover:bg-orange-100"
                }`}
              >
                {g}
              </button>
            ))}
            <button
              onClick={() => onApply("genre", "")}
              className="px-4 py-2 text-left bg-red-600 text-white hover:bg-red-700"
            >
              Clear Genre
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        className="px-4 py-2 bg-orange-50 text-black text-left flex items-center gap-2"
        onClick={() => setMenuOpen(menuOpen === "authors" ? null : "authors")}
      >
        <span className="text-lg">{menuOpen === "authors" ? "−" : "+"}</span>
        <span>Authors</span>
      </button>
      <AnimatePresence>
        {menuOpen === "authors" && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-y-scroll scrollbar-hide max-h-[400px] flex flex-col gap-2 pl-6"
          >
            {authors.map((a) => (
              <button
                key={a}
                onClick={() => onApply("author", a)}
                className={`px-4 py-2 text-left ${
                  currentAuthor === a
                    ? "bg-[#77211a] text-white"
                    : "bg-orange-50 text-black hover:bg-orange-100"
                }`}
              >
                {a}
              </button>
            ))}
            <button
              onClick={() => onApply("author", "")}
              className="px-4 py-2 text-left bg-red-600 text-white hover:bg-red-700"
            >
              Clear Author
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
