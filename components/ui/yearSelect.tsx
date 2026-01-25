"use client";
import { useRouter, useSearchParams } from "next/navigation";

export default function YearSelect({ currentYear }: { currentYear: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleYearChange = (year: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("year", year);
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const years = ["2026", "2025", "2024", "2023"];

  return (
    <select
      value={currentYear}
      onChange={(e) => handleYearChange(e.target.value)}
      className="ml-2 border rounded p-1 text-sm bg-transparent outline-none"
    >
      {years.map((y) => (
        <option key={y} value={y}>
          {y}
        </option>
      ))}
    </select>
  );
}
