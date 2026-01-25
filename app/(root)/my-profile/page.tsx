import React from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getBorrowHistory } from "@/lib/actions/data-fetchers";
import Borrowed from "@/components/borrowed";
import { SelectUser } from "@/types";

const Page = async () => {
  const session = await auth();
  if (!session) redirect("/");
  //console.log("User Session:", session?.user.id);

  const name = session.user.name || "User";
  const role = session.user.role || "USER";
  const selectedUser = {
    userid: session.user.id,
    isSelected: true,
    name: name,
  } as SelectUser;

  const books = await getBorrowHistory({ userId: session.user.id });
  //console.log("books fetched from getBorrowHistory:", books);

  //console.log("Borrow History:", borrowHistory);
  //console.log("sampleBooks", sampleBooks);
  return (
    <>
      <div className="w-full flex flex-row flex-wrap">
        <Borrowed
          books={books}
          selectedUser={selectedUser}
          title="History"
          role={role}
        />
      </div>
    </>
  );
};
export default Page;
