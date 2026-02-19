"use client";
import React from "react";
import BookCard from "@/components/BookCard";
import { Genres, sampleBooks } from "@/constants";
import Link from "next/link";
import { Book } from "@/types";
import { CarouselNav } from "./carouselNav";
import { useCarousel } from "@/hooks/useCarousel";
import { cn } from "@/lib/utils";
import { useLocale } from "@/app/providers/I18nProvider";

interface Props {
  title?: string;
  books?: Book[] | any;
  containerClassName?: string;
  displayAsWrap?: boolean;
  clampLines?: boolean;
}

const BookList = ({
  title,
  books = sampleBooks,
  containerClassName,
  displayAsWrap = false,
  clampLines = false,
}: Props) => {
  const { t } = useLocale();
  const { scrollRef, handlePrevious, handleNext, canGoPrevious, canGoNext } =
    useCarousel({
      totalItems: books.length,
    });

  if (books && books.length < 1) return;

  return (
    <section className={cn(containerClassName, "md:mx-0 mx-2")}>
      {title && (
        <div className="flex flex-row justify-between">
          <Link href={`/category/${encodeURIComponent(title)}`}>
            <h2 className="font-bebas-neue text-4xl text-black">
              {t(Genres.find((g) => g.value === title)?.titleKey || "")}
            </h2>
          </Link>
          {!displayAsWrap && (
            <CarouselNav
              onPrevious={handlePrevious}
              onNext={handleNext}
              canGoPrevious={canGoPrevious}
              canGoNext={canGoNext}
            />
          )}
        </div>
      )}
      <ul
        ref={scrollRef}
        className={displayAsWrap ? "book-list-wrap" : "book-list"}
      >
        {books &&
          books.map((book: any) => (
            <BookCard key={book.id} {...book} clampLines={clampLines} />
          ))}
      </ul>
    </section>
  );
};
export default BookList;
