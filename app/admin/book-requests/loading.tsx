import React from "react";

const LoadingRequests = () => {
  const skeletonCards = Array.from({ length: 6 });

  return (
    <div className="flex flex-row flex-wrap gap-5 rounded-xl bg-white p-6 shadow-lg min-h-[500px]">
      {skeletonCards.map((_, i) => (
        <div
          key={i}
          className="w-[300px] h-[200px] animate-pulse rounded-lg bg-slate-100 p-4"
        >
          {/* Title bar skeleton */}
          <div className="h-6 w-3/4 rounded bg-slate-200 mb-4" />
          {/* Author/Publisher lines */}
          <div className="space-y-2">
            <div className="h-4 w-1/2 rounded bg-slate-200" />
            <div className="h-4 w-2/3 rounded bg-slate-200" />
          </div>
          {/* Footer button skeleton */}
          <div className="mt-auto pt-6">
            <div className="h-10 w-full rounded-xl bg-slate-200" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingRequests;
