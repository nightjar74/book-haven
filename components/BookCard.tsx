import React from "react";
import Link from "next/link";
import BookCover from "@/components/BookCover";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Book } from "@/types";

const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");

const BookCard = ({
  id,
  title,
  genre,
  coverColor,
  coverUrl,
  count,
  dueDate,
  isLoanedBook = false,
  clampLines = false as unknown as boolean,
  thumbnail = false as boolean,
}: Book | any) => (
  <li id="listItem" className={cn(isLoanedBook && "xs:w-52 w-full")}>
    <Link
      href={`/books/${slugify(title)}`}
      className={cn(
        isLoanedBook &&
          "w-full flex flex-col items-center hover:scale-105 transition-transform duration-200",
      )}
    >
      <BookCover
        title={title}
        coverColor={coverColor}
        coverImage={coverUrl}
        variant={thumbnail ? "extraSmall" : "regular"}
      />

      <div className={cn("mt-4", !isLoanedBook && "xs:max-w-40 max-w-28")}>
        <p className={cn("book-title", clampLines && "line-clamp-4")}>
          {title}
        </p>
        <p className="book-genre">{genre}</p>
      </div>

      {isLoanedBook && (
        <div className="mt-3 w-full">
          <div className="book-loaned">
            <Image
              src="/icons/calendar.svg"
              alt="calendar"
              width={18}
              height={18}
              className="object-contain"
            />
            <p className="text-black">{dueDate}</p>
          </div>
          <p>copies borrowed: {count}</p>

          {/* <Button className="book-btn text-black">Download receipt</Button> */}
        </div>
      )}
    </Link>
  </li>
);

export default BookCard;
