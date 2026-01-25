"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";

export function useFilterParams(basePath?: string) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentAuthor = searchParams.get("author") ?? "";
  const currentGenre = searchParams.get("genre") ?? "";

  const applyFilter = (type: "author" | "genre", value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set(type, value);
    } else {
      params.delete(type);
    }

    const targetPath = basePath ?? pathname;

    router.replace(`${targetPath}?${params.toString()}`, { scroll: false });
  };

  const clearAll = () => {
    router.replace(pathname, { scroll: false });
  };

  return {
    currentAuthor,
    currentGenre,
    applyFilter,
    clearAll,
  };
}
