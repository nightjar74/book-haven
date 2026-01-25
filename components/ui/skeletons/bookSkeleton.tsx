import React from "react";

const BookSkeleton = () => {
  return (
    <div className="flex flex-col gap-4 p-4 border border-orange-100 rounded-lg animate-pulse bg-white">
      <div className="aspect-[3/4] w-full bg-slate-200 rounded-md" />

      <div className="space-y-3">
        <div className="h-5 bg-slate-200 rounded w-3/4" />

        <div className="h-4 bg-slate-200 rounded w-1/2" />

        <div className="flex justify-between items-center pt-2">
          <div className="h-6 bg-slate-200 rounded w-1/4" />
          <div className="h-8 bg-slate-200 rounded-full w-8" />
        </div>
      </div>
    </div>
  );
};

export default BookSkeleton;
