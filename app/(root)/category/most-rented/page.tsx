import BookList from "@/components/BookList";
import { buildBookQuery } from "@/lib/buildBookQuery";
import React from "react";

const page = async () => {
  const { query: books } = (await buildBookQuery({
    category: "Most Borrowed",
  })) as any;
  //console.log("Most Rented Books:", books);

  return (
    <div className="md:mt-0 text-white flex flex-col">
      <h1 className="md:text-[40px] text-[25px] text-black font-medium ml-5">
        Most Rented Books
      </h1>
      <div className="w-full h-full md:px-0 px-10 ml-0 flex md:mt-7">
        <div className="md:ml-[80px]">
          <BookList books={books} displayAsWrap={true} clampLines={true} />
        </div>
      </div>
    </div>
  );
};

export default page;
