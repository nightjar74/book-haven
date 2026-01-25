import React from "react";
import BookSkeleton from "./bookSkeleton";

export function BookListSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, i) => (
        <BookSkeleton key={i} />
      ))}
    </div>
  );
}
