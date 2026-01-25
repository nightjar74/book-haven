import { auth } from "@/auth";
import BookList from "@/components/BookList";
import { getCollectionBySlug } from "@/lib/actions/data-fetchers";
import { notFound, redirect } from "next/navigation";
import React, { Suspense } from "react";

async function sets({ params }: { params: Promise<{ slug: string }> }) {
  const session = await auth();
  if (!session) redirect("/");

  const { slug } = await params;

  const decodedSet = decodeURIComponent(slug);
  const booksInSet = await getCollectionBySlug(decodedSet);
  //console.log("results from sets page", booksInSet, slug, decodedSet);

  if (!booksInSet || booksInSet.length === 0) {
    notFound();
  }

  return (
    <div className="md:mt-20 mt-[105px] text-white flex flex-col">
      <div className="md:ml-12 ml-0 md:p-5 p-0 mt-5 md:mt-10 absolute md:left-0 left-5 top-[150px] md:top-[150px] flex flex-row">
        <h1 className="md:text-[40px] text-[25px] w-[80vw] truncate text-black font-medium">
          {decodedSet}
        </h1>
      </div>

      <div className="w-full px-10 md:px-0 ml-0 md:pl-[10%] flex flex-row">
        <BookList
          books={booksInSet}
          containerClassName="md:mt-10 mt-0"
          displayAsWrap={true}
        />
      </div>
    </div>
  );
}

export default sets;
