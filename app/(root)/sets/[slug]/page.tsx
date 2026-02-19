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
    <div className="md:mt-0 mt-[15px] text-white flex flex-col">
      <div className="md:ml-0 ml-0 md:p-0 p-0 mt-5 md:mt-0 md:left-0 left-5 flex flex-row">
        <h1 className="md:text-[40px] w-[80vw] ml-[2%] text-black font-medium capitalize text-[25px]">
          {decodedSet}
        </h1>
      </div>

      <div className="w-full px-10 md:px-0 ml-0 md:pl-[2%] flex flex-row">
        <BookList
          books={booksInSet}
          containerClassName="mt-0"
          displayAsWrap={true}
        />
      </div>
    </div>
  );
}

export default sets;
