import React from "react";

export default function Loading() {
  return (
    <div className="flex flex-col gap-5">
      <div className="w-full min-h-[500px] bg-white rounded-xl h-auto p-2 shadow-lg flex flex-col gap-1 pt-5 animate-pulse">
        {/* Title Skeleton */}
        <div className="h-8 w-32 bg-gray-200 rounded-md mb-6 mx-auto" />

        {/* List of Card Skeletons */}
        <div className="flex flex-col gap-2">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="w-full h-16 bg-gray-100 rounded-lg flex items-center px-4 gap-4"
            >
              {/* Profile Avatar Circle Skeleton */}
              <div className="w-10 h-10 bg-gray-200 rounded-full shrink-0" />

              <div className="flex flex-col gap-2 w-full">
                {/* Name line */}
                <div className="h-4 w-1/3 bg-gray-200 rounded" />
                {/* Email line */}
                <div className="h-3 w-1/2 bg-gray-200 rounded" />
              </div>

              {/* Role Tag Skeleton */}
              <div className="h-6 w-16 bg-gray-200 rounded-full ml-auto" />
            </div>
          ))}
        </div>
      </div>

      {/* Borrowed Component Skeleton */}
      <div className="w-full h-64 bg-gray-100 rounded-xl animate-pulse" />
    </div>
  );
}
