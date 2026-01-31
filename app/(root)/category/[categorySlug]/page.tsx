import { auth } from "@/auth";
import BookList from "@/components/BookList";
import { db } from "@/database/drizzle";
import { books } from "@/database/schema";
import { redirect } from "next/navigation";
import { buildBookQuery } from "@/lib/buildBookQuery";
import Filter from "../../../../components/filter";
import { Button } from "@/components/ui/button";
import Pagination from "@/components/admin/Pagination";

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ categorySlug: string }>;
  searchParams: Promise<{ genre?: string; author?: string; page?: string }>;
}) {
  const session = await auth();
  if (!session) redirect("/");

  const { categorySlug } = await params;
  const { genre, author, page } = await searchParams;

  //console.log("page:", page);

  //console.log(categorySlug, "category slug");
  if (categorySlug === "events" || categorySlug === "projects") {
    return (
      <div className="w-full flex justify-center text-slate-500 italic py-10">
        Bookhaven doesn’t have any {categorySlug} scheduled at the moment.
      </div>
    );
  }

  const limit = 25;
  const currentPage = Number(page) || 1;
  const decodedCategory = decodeURIComponent(categorySlug);

  const { query: fetchedBooks, countQuery } = await buildBookQuery({
    category: decodedCategory,
    genre,
    author,
    page: currentPage,
    limit,
  });

  const [allGenres, allAuthors] = await Promise.all([
    db.selectDistinct({ genre: books.genre }).from(books),
    db.selectDistinct({ author: books.author }).from(books),
  ]);

  const totalPages = Math.ceil(countQuery / limit);

  //console.log("genre:", genre, "author:", author, "count:", totalCountRes);
  return (
    <div className="md:mt-20 mt-[105px] text-white flex flex-row">
      <div className="md:ml-12 ml-0 md:p-5 p-0 mt-5 md:mt-10 absolute md:left-0 left-5 top-[150px] md:top-[150px] flex flex-row">
        <h1 className="md:text-[40px] text-[25px] text-black font-medium">
          {genre || author
            ? `Products found by filter: ${fetchedBooks.length}`
            : `${decodedCategory}`}
        </h1>
        <div className="md:hidden">
          <Filter
            authors={allAuthors.map((a) => a.author)}
            genres={allGenres.map((g) => g.genre)}
          />
        </div>
      </div>
      <div className="absolute hidden md:block left-0 md:top-[300px] top-[228px] w-full max-w-[350px] min-w-[300px] p-5 ml-12">
        <Filter
          authors={allAuthors.map((a) => a.author)}
          genres={allGenres.map((g) => g.genre)}
        />
      </div>

      <div className="w-full min-h-screen md:px-0 px-10 ml-0 md:ml-[350px] flex flex-col">
        <div className="w-full flex flex-row">
          {/*         <div className="xl:w-[300px] lg:w-[350px]" /> */}
          {fetchedBooks.length > 0 ? (
            <BookList
              books={fetchedBooks}
              containerClassName="md:mt-10 mt-0"
              displayAsWrap={true}
            />
          ) : (
            <div className="w-full py-20 flex flex-col items-center justify-center">
              <p className="text-xl text-slate-500 italic">
                No books found matching these filters.
              </p>
              <Button
                variant="link"
                onClick={() => redirect(`/category/${categorySlug}`)}
              >
                Clear all filters
              </Button>
            </div>
          )}
        </div>
        <div className="w-full flex justify-center mt-10">
          <Pagination totalPages={totalPages} />
        </div>
      </div>
    </div>
  );
}
