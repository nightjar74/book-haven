import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  return redirect("/category/All%20Books");
  return (
    <div className="md:mt-0 text-white flex flex-col">
      <h1 className="md:text-[40px] text-[25px] text-black font-medium ml-5">
        Recommended Books
      </h1>
      <div className="w-full h-full md:px-0 px-10 ml-0 flex md:mt-7"></div>
    </div>
  );
};

export default page;
