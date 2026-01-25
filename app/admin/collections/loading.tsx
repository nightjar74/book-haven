import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="w-full space-y-10">
      {/* Top Admin Cards Container */}
      <div className="w-full min-h-[250px] h-[300px] bg-slate-200/50 rounded-xl p-6 shadow-lg flex flex-row gap-4 relative">
        {/* Simulating 3 Collection Cards */}
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="flex-1 h-full rounded-xl border border-slate-200 p-4 space-y-4"
          >
            <Skeleton className="h-6 w-3/4" /> {/* Title */}
            <div className="flex justify-between items-start">
              <Skeleton className="h-16 w-1/2" /> {/* Subtitle lines */}
              <Skeleton className="h-20 w-20 rounded-full" />{" "}
              {/* Image circle */}
            </div>
          </div>
        ))}
        {/* Top Right Buttons */}
        <div className="absolute right-5 top-5 flex gap-2">
          <Skeleton className="h-10 w-24 rounded-md" />
          <Skeleton className="h-10 w-24 rounded-md" />
        </div>
      </div>

      {/* Bottom Books Section */}
      <div className="w-full min-h-screen bg-slate-200/50 rounded-xl p-6 shadow-lg space-y-8">
        {/* Search Bar Skeleton */}
        <div className="flex justify-center w-full mx-auto max-w-[800px]">
          <Skeleton className="h-12 w-full rounded-full" />
        </div>

        {/* Table/List Skeleton */}
        <div className="space-y-6">
          <Skeleton className="h-6 w-20" /> {/* "Table" text */}
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="flex items-center gap-4 p-4 border rounded-lg"
            >
              <Skeleton className="h-16 w-12 rounded-md" /> {/* Book Cover */}
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-1/4" /> {/* Title */}
                <Skeleton className="h-3 w-1/6" /> {/* Author */}
              </div>
              <Skeleton className="h-8 w-20" /> {/* Select Button */}
            </div>
          ))}
        </div>

        {/* Pagination Skeleton */}
        <div className="flex justify-center pt-4">
          <Skeleton className="h-10 w-64" />
        </div>
      </div>
    </div>
  );
}
