"use client";

import BookCard from "./BookCard";
import { useEffect, useState } from "react";
import { borrowRecords } from "@/database/schema";
import { useBorrowedBooks } from "@/hooks/useBorrowed";

interface BorrowedProps {
  title?: string;
  books: any[];
  selectedUser: {
    isSelected: boolean;
    name?: string | null;
  };
  role?: string;
}

const Borrowed = ({ books, selectedUser, title, role }: BorrowedProps) => {
  //console.log(books, "book in borrowed component");

  if (!selectedUser.isSelected) {
    return (
      <div
        id="booksContainer"
        className="w-full min-h-[500px] bg-white rounded-xl h-auto p-2 shadow-lg flex flex-col gap-1 pt-5"
      >
        <h2 className="md:text-lg text-md font-normal text-gray-600 mb-6 text-center mt-[200px]">
          Select a user to see borrowed books
        </h2>
      </div>
    );
  }

  return (
    <div
      id="booksContainer"
      className="w-full min-h-[500px] bg-white rounded-xl h-auto p-2 shadow-lg flex flex-col gap-1 pt-5"
    >
      {role === "USER" && books.length === 0 && (
        <p className="absolute md:top-1/2 top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-slate-700 text-center">
          You haven't borrowed any books yet.
          <br /> Start your journey by browsing our collection!
        </p>
      )}
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        {title ? title : `Books Borrowed by ${selectedUser.name}`}
      </h2>
      <div className="w-full h-full p-12 flex items-center justify-center">
        <ul className="flex gap-10 flex-wrap mx-auto justify-center">
          {!books.length && (
            <p className="md:text-lg text-md font-normal text-gray-600 text-center pb-[100px]">
              {selectedUser.name} hasn't borrowed any books yet
            </p>
          )}
          {books.map(({ book, count, dueDate }) => (
            <BookCard
              key={book.id}
              id={book.id}
              title={book.title}
              genre={book.genre}
              coverUrl={book.coverUrl}
              coverColor={book.coverColor}
              dueDate={dueDate}
              isLoanedBook
              count={count}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Borrowed;
