"use client";
import { useState, useEffect, useRef } from "react";
import { useDebounce } from "./useDebounce";
import { importBookById } from "@/lib/actions/admin/importBook";
import { toast } from "@/hooks/use-toast";
import { set } from "zod";

export const useBookImport = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [isImporting, setIsImporting] = useState<string | null>(null);
  const [blocked, setBlocked] = useState(false);

  const debouncedQuery = useDebounce(query, 500);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    //console.log("isOpen: ", isOpen);
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      //console.log("event target", event.target);
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        //console.log("container Ref", containerRef.current);
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (debouncedQuery.length < 3 || blocked) {
        setResults([]);
        setIsOpen(false);
        return;
      }

      setIsSearching(true);
      try {
        const res = await fetch(
          `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(debouncedQuery)}&maxResults=6`,
        );
        if (res.status === 429) {
          toast({
            title: "Error",
            description: `Quota exceeded for Google Books API. Please try again later.`,
            variant: "destructive",
          });
          setBlocked(true);
          return;
        }
        const data = await res.json();
        setResults(data.items || []);
        setIsOpen(true);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setIsSearching(false);
      }
    };

    fetchSuggestions();
  }, [debouncedQuery]);

  const handleImport = async (googleBookId: string) => {
    setIsImporting(googleBookId);

    try {
      const result = await importBookById(googleBookId);

      if (result.success) {
        toast({
          title: "Success",
          description: `Added ${result.title} to library!`,
          variant: "default",
        });
        setIsOpen(false);
        setQuery("");
      } else {
        throw new Error(result.message || "Failed to import book");
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsImporting(null);
    }
  };

  return {
    query,
    setQuery,
    results,
    isOpen,
    setIsOpen,
    isSearching,
    isImporting,
    containerRef,
    handleImport,
  };
};
