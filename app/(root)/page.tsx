import BookList from "@/components/BookList";
import { db } from "@/database/drizzle";
import { books, users } from "@/database/schema";
import { auth } from "@/auth";
import { desc } from "drizzle-orm";
import Hero from "@/components/Hero";
import { getBooksByGenres, getCollections } from "@/lib/actions/data-fetchers";
import { redirect } from "next/navigation";
import { getServerLocale } from "@/lib/getServerLocale";

const Home = async () => {
  const session = await auth();
  //const locale = await getServerLocale();

  if (!session) return redirect("/sign-in");

  const [latestBooks, softwareBooks, childrenBooks, collections] =
    await Promise.all([
      db.select().from(books).limit(10).orderBy(desc(books.createdAt)),
      getBooksByGenres(["Computers"]),
      getBooksByGenres(["Juvenile Fiction", "Education"]),
      getCollections(),
    ]);

  return (
    <>
      <Hero data={collections} />

      <BookList
        title="Latest Books"
        books={latestBooks.slice(1)}
        containerClassName="mt-[70px]"
      />
      <BookList
        title="Computers"
        books={softwareBooks.slice(0)}
        containerClassName="mt-[70px]"
      />
      <BookList
        title="Juvenile Fiction/Education"
        books={childrenBooks.slice(0)}
        containerClassName="mt-[70px]"
      />
      {/*       <BookList 
        title="Fiction"
        books={Fiction.slice(1)}
        containerClassName="mt-[70px]"
      /> */}
    </>
  );
};

export default Home;
