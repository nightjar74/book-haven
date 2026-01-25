"use client";
import { useBorrowedBooks } from "@/hooks/useBorrowed";
import Borrowed from "./borrowed";
import { useEffect, useState } from "react";
import { getBorrowHistory } from "@/lib/actions/data-fetchers";
import { useUserActivity } from "@/app/context/userActivityProvider";
import { BorrowedSkeleton, SkeletonLoader } from "@/app/admin/skeletons";
import { useQuery } from "@tanstack/react-query";

const BorrowedWithActivity = () => {
  const { selectedUser } = useUserActivity();
  const userId = selectedUser?.userid;

  const {
    data: books,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["borrow-history", userId],
    queryFn: () => getBorrowHistory({ userId: userId! }),
    enabled: !!userId, // Prevents fetching if no user is selected
  });

  if (!selectedUser?.isSelected) {
    return <Borrowed books={[]} selectedUser={selectedUser} />;
  }

  if (isLoading) {
    return <BorrowedSkeleton />;
  }

  if (isError) {
    return (
      <div className="w-full p-10 text-center text-red-500 bg-white rounded-xl shadow-lg">
        Failed to load borrow history. Please try again.
      </div>
    );
  }

  return <Borrowed books={books || []} selectedUser={selectedUser} />;
};

export default BorrowedWithActivity;
