"use client";
import React from "react";
import BookCard from "./BookCard";
import BookCover from "./BookCover";
import UpdateQuantityModal from "./admin/modals/updateQuantityModal";
import { useModal } from "@/hooks/use-modal";
import { useBookSelector } from "@/app/context/book-selector-context";
import { cn } from "@/lib/utils";

type Props = {
  id: string;
  title?: string;
  author?: string;
  genre?: string;
  totalCopies: number;
  available: number;
  cover: string;
};

function AllBooksSelect({
  id,
  title,
  author,
  genre,
  totalCopies,
  available,
  cover,
}: Props) {
  const { toggleBookSelection, selections, activeCardIndex } =
    useBookSelector();

  const isSelected = selections[activeCardIndex]?.includes(id);
  return (
    <>
      <div
        onClick={() => toggleBookSelection(id)}
        className={cn(
          "cursor-pointer flex flex-row items-center justify-between rounded-[24px] p-4 border-[1px] border-gray-100 hover:bg-slate-200 transition-transform duration-300 ease-in-out transform hover:-translate-y-0.5",
          isSelected
            ? "border-blue-500 bg-blue-50 shadow-inner"
            : "border-transparent bg-white"
        )}
      >
        <div className="flex flex-row gap-5 items-center flex-1">
          <BookCover
            coverColor={"#012B48"}
            coverImage={cover}
            className="w-[80px] h-[100px]"
          />
          <div className="flex flex-col gap-1 max-w-[100px] md:max-w-full">
            <p className="md:text-xl text-sm text-black font-semibold line-clamp-3">
              {title}
            </p>
            <p className="md:text-sm text-xs text-gray-600 line-clamp-2">
              by {author}
            </p>
          </div>
        </div>

        <div className="hidden md:flex flex-row gap-8 items-center">
          <div className="flex flex-col items-center min-w-[100px]">
            <p className="text-sm text-gray-500 font-medium">Genre</p>
            <p className="text-base text-black font-semibold">{genre}</p>
          </div>

          <div className="flex flex-col items-center min-w-[100px]">
            <p className="text-sm text-gray-500 font-medium">Total Copies</p>
            <p className="text-base text-black font-semibold">{totalCopies}</p>
          </div>

          <div className="flex flex-col items-center min-w-[100px]">
            <p className="text-sm text-gray-500 font-medium">Available</p>
            <p className="text-base text-green-600 font-semibold">
              {available}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default AllBooksSelect;
