import React from "react";
import { BookCardSkeleton } from "@/app/admin/skeletons";

export default function Loading() {
  const skeletons = Array.from({ length: 10 });

  return (
    <div className="mt-0 flex flex-col min-h-screen">
      <div className="md:ml-12 ml-5 md:p-5 p-0 mt-5 md:mt-0">
        <div className="h-10 w-48 bg-gray-200 rounded-md animate-pulse mb-10" />
      </div>

      <div className="w-full px-10 md:px-0 ml-0 md:pl-[10%]">
        <ul className="flex flex-wrap gap-10">
          {skeletons.map((_, i) => (
            <div key={i} className="xs:w-40 w-[130px]">
              <BookCardSkeleton />
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}
