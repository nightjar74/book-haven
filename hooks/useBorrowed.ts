import { useMemo } from "react";

export const useBorrowedBooks = ({
  selectedUser,
  borrowData,
  booksBorrowed,
}: {
  selectedUser: any;
  borrowData: any[];
  booksBorrowed: any[];
}) => {
  return useMemo(() => {
    if (!selectedUser) {
      return { books: [] };
    }

    const booksById = new Map(
      booksBorrowed.map((book) => [book.book.id, book]),
    );

    //console.log("booksById map:", booksById);

    const borrowMap = new Map<
      string,
      {
        book: any;
        count: number;
        dueDate: any;
      }
    >();

    //console.log("borrowmap:", borrowMap);

    for (const record of borrowData) {
      if (record.userId !== selectedUser.userid) continue;

      const book = booksById.get(record.bookId);
      //console.log("book", book);
      if (!book) continue;
      //console.log("Found borrowed book:", book);

      if (!borrowMap.has(book.book.id)) {
        //console.log("Adding book to borrowMap:", book);
        borrowMap.set(book.book.id, {
          book,
          count: 1,
          dueDate: record.dueDate,
        });
      } else {
        //console.log("Incrementing count for book in borrowMap:", book);
        borrowMap.get(book.book.id)!.count += 1;
      }
    }

    //console.log("Final borrowMap:", borrowMap);

    return {
      books: Array.from(borrowMap.values()),
    };
  }, [selectedUser, borrowData, booksBorrowed]);
};
