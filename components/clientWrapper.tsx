import { useBorrowedBooks } from "@/hooks/useBorrowed";
import { SelectUser } from "@/types";
import React from "react";
import Borrowed from "./borrowed";

type props = {
  selectedUser: SelectUser;
  borrowData: any;
  booksBorrowed: any;
  title?: string;
  isAdmin?: string;
};

const Wrapper = ({
  selectedUser,
  borrowData,
  booksBorrowed,
  title,
  isAdmin,
}: props) => {
  const { books } = useBorrowedBooks({
    selectedUser,
    borrowData,
    booksBorrowed,
  });

  return (
    <Borrowed
      books={books}
      selectedUser={selectedUser}
      title={title}
      role={isAdmin}
    />
  );
};

export default Wrapper;
