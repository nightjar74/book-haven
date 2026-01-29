import React from "react";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import BookOverview from "@/components/BookOverview";
import BookList from "@/components/BookList";
import { getBook, getCommonBooks } from "@/lib/actions/data-fetchers";
import { get } from "http";
import { getServerLocale } from "@/lib/getServerLocale";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  //const fullSlug = await params;
  //const locale = await getServerLocale();

  const title = (await params).id;
  console.log(title, "title");
  const session = await auth();

  if (!session) {
    redirect("/");
  }

  try {
    const bookDetails = await getBook(title);
    const commonBooks = await getCommonBooks(
      bookDetails.genre,
      bookDetails.title,
    );
    //console.log("Book Data Fetched:", bookDetails);
    //console.log("Common Books Fetched:", commonBooks);

    if (!bookDetails) redirect("/404");

    //console.log("Book Details:", bookDetails);

    return (
      <>
        <BookOverview {...bookDetails} userId={session?.user?.id as string} />

        <div className="w-full pt-[100px]">
          {commonBooks.length === 0 ? (
            <div className="text-black"></div>
          ) : (
            <BookList
              title={bookDetails.genre}
              books={commonBooks.slice(0)}
              containerClassName="mt-[70px]"
            />
          )}
        </div>
      </>
    );
  } catch (e) {
    console.error("Critical error loading book page:", e);
    throw new Error("Failed to load book details.");
  }
};
export default Page;
