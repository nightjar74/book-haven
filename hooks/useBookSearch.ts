import { useEffect, useState } from "react";
import { Book } from "@/types";
import { useDebounce } from "./useDebounce";
import { set } from "zod";

export function useBookSearch(query: string) {
  const debouncedQuery = useDebounce(query, 250);

  const [results, setResults] = useState<Book[]>([]);
  const [showMenu, setShowMenu] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (debouncedQuery.length < 2) {
      setResults([]);
      return;
    }

    let cancelled = false;

    async function search() {
      setLoading(true);

      const res = await fetch(
        `/api/search?q=${encodeURIComponent(debouncedQuery)}`
      );

      const data = await res.json();

      if (!cancelled) {
        setResults(data);
        setLoading(false);
        setShowMenu(true);
      }
    }

    search();

    return () => {
      cancelled = true;
    };
  }, [debouncedQuery]);

  return { results, loading, showMenu, setShowMenu };
}
