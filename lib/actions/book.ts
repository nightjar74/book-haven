"use server";

import { db } from "@/database/drizzle";
import { books, borrowRecords, receipts, users } from "@/database/schema";
import { eq } from "drizzle-orm";
import dayjs from "dayjs";
import { BorrowBookParams } from "@/types";
import { revalidatePath, revalidateTag } from "next/cache";

export const borrowBook = async (params: BorrowBookParams) => {
  const { userId, bookId } = params;

  try {
    const [bookData] = await db
      .select()
      .from(books)
      .where(eq(books.id, bookId))
      .limit(1);
    const [userData] = await db
      .select()
      .from(users)
      .where(eq(users.id, userId))
      .limit(1);

    if (!bookData || bookData.availableCopies <= 0) {
      return { success: false, error: "Book is not available for borrowing" };
    }
    if (!userData) {
      return { success: false, error: "User not found" };
    }

    const dueDate = dayjs().add(7, "day").toDate().toDateString();

    const [record] = await db
      .insert(borrowRecords)
      .values({
        userId,
        bookId,
        dueDate,
        status: "BORROWED",
      })
      .returning();

    await db.insert(receipts).values({
      userId,
      userName: userData.fullName,
      userEmail: userData.email,
      bookTitle: bookData.title,
    });

    await db
      .update(books)
      .set({
        availableCopies: bookData.availableCopies - 1,
        borrowCount: bookData.borrowCount + 1,
      })
      .where(eq(books.id, bookId));

    revalidateTag("users-cache");
    revalidateTag("borrow-requests");
    revalidateTag("borrow-records");
    revalidateTag("books");

    return {
      success: true,
      data: JSON.parse(JSON.stringify(record)),
    };
  } catch (error) {
    console.error("BorrowBook Error:", error);
    return {
      success: false,
      error: "An error occurred while borrowing the book",
    };
  }
};

export const updateBookQuantity = async (
  bookId: string,
  values: { totalCopies: number; availableCopies: number },
) => {
  try {
    await db
      .update(books)
      .set({
        totalCopies: values.totalCopies,
        availableCopies: values.availableCopies,
      })
      .where(eq(books.id, bookId));

    //revalidatePath(`/books/${bookId}`);
    revalidateTag("books");
    revalidatePath("/admin/books");

    return { success: true };
  } catch (error) {
    console.error("Database Update Error:", error);
    return { success: false, error: "Failed to update book inventory." };
  }
};
