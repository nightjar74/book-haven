import { eq, desc, gt } from "drizzle-orm";
import { books } from "@/database/schema";

export type CategoryContext = {
  where: any[];
  meta: {
    orderBy?: any;
    limit?: number;
  };
};

export type CategoryHandler = (ctx: CategoryContext) => void;

export const BOOK_CATEGORIES: Record<string, CategoryHandler> = {
  "All Books": (ctx) => {
    ctx.meta.limit = 50;
  },

  "Latest Books": (ctx) => {
    ctx.meta.orderBy = desc(books.createdAt);
    ctx.meta.limit = 50;
  },

  "Most Borrowed": (ctx) => {
    ctx.meta.orderBy = desc(books.borrowCount);
    ctx.meta.limit = 50;
  },

  /*   Discounts: (ctx) => {
    ctx.where.push(gt(books.discountPercent, 0));
  },

  Events: (ctx) => {
    ctx.where.push(eq(books.type, "EVENT"));
  }, */
};
