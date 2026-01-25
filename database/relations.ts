import { relations } from "drizzle-orm";
import { users, books, borrowRecords } from "./schema";

/* User → Borrow Records (1 → many) */
export const usersRelations = relations(users, ({ many }) => ({
  borrowRecords: many(borrowRecords),
}));

/* Book → Borrow Records (1 → many) */
export const booksRelations = relations(books, ({ many }) => ({
  borrowRecords: many(borrowRecords),
}));

/* BorrowRecord → User + Book (many → 1) */
export const borrowRecordsRelations = relations(borrowRecords, ({ one }) => ({
  user: one(users, {
    fields: [borrowRecords.userId],
    references: [users.id],
  }),
  book: one(books, {
    fields: [borrowRecords.bookId],
    references: [books.id],
  }),
}));
