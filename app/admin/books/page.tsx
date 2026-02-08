"use server";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import AllBooks from "@/components/allBooks";
import { getBooks, getBooksCount } from "@/lib/actions/data-fetchers";
import Pagination from "@/components/admin/Pagination";
import Search from "@/components/admin/search";
import { redirect } from "next/navigation";

const Page = async (props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) => {
  const queryParams = await props.searchParams;
  const query = queryParams?.query || "";
  const currentPage = queryParams?.page ? parseInt(queryParams.page) : 1;
  //console.log("Query:", query, "Page:", currentPage);
  const limit = 10;

  if (currentPage < 1) {
    redirect(`/admin/books?page=1`);
  }

  let booksData: any[] = [];
  let totalBooks: number = 0;
  [booksData, totalBooks] = await Promise.all([
    getBooks(query, currentPage, limit),
    getBooksCount(query),
  ]);

  const totalPages = Math.ceil(totalBooks / limit);

  if (currentPage > totalPages && totalPages > 0) {
    redirect(`/admin/books?page=${totalPages}`);
  }

  return (
    <>
      <section className="w-full rounded-2xl bg-white p-7">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-xl font-semibold">All Books</h2>
          <div className="flex justify-center w-full max-w-[800px]">
            <Search placeholder="Search books..." />
          </div>
          <Button className="bg-primary-admin" asChild>
            <Link href="/admin/books/new" className="text-white">
              + Create a New Book
            </Link>
          </Button>
        </div>

        <div className="mt-7 w-full overflow-hidden">
          {booksData &&
            booksData.map((book) => (
              <div key={book.id} className="my-5">
                <AllBooks
                  id={book.id}
                  title={book.title}
                  author={book.author}
                  genre={book.genre}
                  totalCopies={book.totalCopies}
                  available={book.availableCopies}
                  cover={book.coverUrl}
                />
              </div>
            ))}
          <div className="w-full flex justify-center">
            <Pagination totalPages={totalPages} />
          </div>
        </div>
      </section>
    </>
  );
};

export default Page;
