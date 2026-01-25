import React from "react";
import AdminCard from "@/components/admin/adminCard";
import {
  getBooks,
  getBooksCount,
  getCollectionsWithBookIds,
} from "@/lib/actions/data-fetchers";
import Pagination from "@/components/admin/Pagination";
import { BookSelectorProvider } from "@/app/context/book-selector-context";
import AllBooksSelect from "@/components/bookSelector";
import Search from "@/components/admin/search";
import { Collection } from "@/types";

const NewCollectionPage = async (props: {
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

  let booksData: any[] = [];
  let totalBooks: number = 0;
  let collections: Collection[] = [];
  [booksData, totalBooks, collections] = await Promise.all([
    getBooks(query, currentPage, limit),
    getBooksCount(query),
    getCollectionsWithBookIds(),
  ]);
  //console.log("collections: ", collections);
  return (
    <React.Fragment>
      <BookSelectorProvider initialData={collections}>
        <div className="w-full md:min-h-[250px] md:h-[300px] h-auto bg-white rounded-xl p-2 shadow-lg flex flex-row gap-1 pt-5 relative">
          <AdminCard collections={collections} />
        </div>
        <div className="w-full min-h-screen h-auto bg-white rounded-xl p-2 shadow-lg flex flex-col gap-1 pt-5 relative mt-10">
          <div className="flex justify-center w-full mx-auto max-w-[800px]">
            <Search placeholder="Search books..." />
          </div>
          <div className="mt-7 w-full overflow-hidden">
            {booksData &&
              booksData.map((book) => (
                <div key={book.id} className="my-5">
                  <AllBooksSelect
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
              <Pagination totalPages={Math.ceil(totalBooks / limit)} />
            </div>
          </div>
        </div>
      </BookSelectorProvider>
    </React.Fragment>
  );
};

export default NewCollectionPage;
