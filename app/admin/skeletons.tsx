import React from "react";

export const SkeletonLoader = () => {
  return (
    <div className="md:w-[50%] w-full bg-white rounded-xl h-[594px] p-2 shadow-lg flex flex-col gap-1 pt-5">
      <div className="h-8 w-32 bg-gray-200 animate-pulse rounded-md mb-6 self-center" />

      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="w-full h-16 bg-gray-100 animate-pulse rounded-lg mb-2 flex items-center px-4 gap-4"
        >
          <div className="w-10 h-10 bg-gray-200 rounded-full" />

          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-200 rounded w-3/4" />
            <div className="h-3 bg-gray-200 rounded w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
};

export const SkeletonChart = () => {
  const bars = Array.from({ length: 12 });

  return (
    <div className="md:w-[50%] w-full h-[594px] p-6 bg-white rounded-lg shadow-lg">
      <div className="h-8 w-48 bg-gray-200 animate-pulse rounded-md mb-6 mx-auto" />

      <div className="rounded-xl bg-gray-50 p-4">
        <div className="md:grid-cols-13 mt-0 grid grid-cols-12 items-end gap-2 rounded-md bg-white p-4 md:gap-4">
          <div className="mb-6 hidden flex-col justify-between sm:flex h-[200px]">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="h-3 w-8 bg-gray-100 animate-pulse rounded"
              />
            ))}
          </div>

          {/* Bar Skeletons */}
          {bars.map((_, index) => (
            <div
              key={index}
              className="flex flex-col items-center gap-2 flex-1"
            >
              <div
                className="w-full rounded-md bg-gray-200 animate-pulse"
                style={{
                  height: `${Math.floor(Math.random() * 100) + 50}px`,
                }}
              />
              <div className="h-3 w-full bg-gray-100 animate-pulse rounded" />
            </div>
          ))}
        </div>
        <div className="flex items-center pb-2 pt-6">
          <div className="h-4 w-4 bg-gray-200 animate-pulse rounded-full" />
          <div className="ml-2 h-4 w-24 bg-gray-200 animate-pulse rounded" />
        </div>
      </div>
    </div>
  );
};

export const BookCardSkeleton = () => {
  return (
    <li className="list-none">
      <div className="flex flex-col">
        <div className="relative aspect-[2/3] w-full rounded-md bg-gray-200 animate-pulse" />
        <div className="mt-4 xs:max-w-40 max-w-28 space-y-2">
          <div className="h-4 w-full rounded bg-gray-200 animate-pulse" />
          <div className="h-3 w-1/2 rounded bg-gray-200 animate-pulse" />
        </div>
      </div>
    </li>
  );
};

export const BorrowedSkeleton = () => {
  return (
    <div className="w-full min-h-[500px] bg-white rounded-xl p-2 shadow-lg flex flex-col gap-1 pt-5 animate-pulse">
      <div className="mx-auto h-8 w-64 bg-gray-200 rounded-md mb-6 mt-2"></div>

      <div className="w-full h-full p-12 flex items-center justify-center">
        <ul className="flex gap-10 flex-wrap mx-auto justify-center">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex flex-col gap-3">
              <div className="w-[180px] h-[250px] bg-gray-200 rounded-lg shadow-sm"></div>
              <div className="h-4 w-3/4 bg-gray-100 rounded"></div>
              <div className="h-3 w-1/2 bg-gray-50 rounded"></div>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};
