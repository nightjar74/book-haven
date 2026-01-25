import React from "react";

const LoadingBooks = () => {
  // Create an array of 6 placeholders
  const skeletonRows = Array.from({ length: 6 });

  return (
    <section className="w-full rounded-2xl bg-white p-7">
      {/* Header Skeleton */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="h-8 w-32 animate-pulse rounded-md bg-slate-100" />
        <div className="h-10 w-40 animate-pulse rounded-md bg-slate-100" />
      </div>

      <div className="mt-7 w-full space-y-5">
        {skeletonRows.map((_, i) => (
          <div
            key={i}
            className="flex flex-row items-center justify-between rounded-[24px] p-4 border-[1px] border-gray-100 animate-pulse"
          >
            {/* Left Side: Image and Title */}
            <div className="flex flex-row gap-5 items-center flex-1">
              {/* Book Cover Placeholder */}
              <div className="w-[80px] h-[100px] rounded-lg bg-slate-100" />

              <div className="flex flex-col gap-2">
                {/* Title Placeholder */}
                <div className="h-5 w-48 rounded bg-slate-100" />
                {/* Author Placeholder */}
                <div className="h-4 w-24 rounded bg-slate-100" />
              </div>
            </div>

            {/* Right Side: Stats (Hidden on mobile to match your component) */}
            <div className="hidden md:flex flex-row gap-8 items-center pr-4">
              <div className="flex flex-col items-center gap-2 min-w-[100px]">
                <div className="h-3 w-12 rounded bg-slate-50" />
                <div className="h-5 w-16 rounded bg-slate-100" />
              </div>
              <div className="flex flex-col items-center gap-2 min-w-[100px]">
                <div className="h-3 w-16 rounded bg-slate-50" />
                <div className="h-5 w-10 rounded bg-slate-100" />
              </div>
              <div className="flex flex-col items-center gap-2 min-w-[100px]">
                <div className="h-3 w-14 rounded bg-slate-50" />
                <div className="h-5 w-10 rounded bg-slate-100" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LoadingBooks;
