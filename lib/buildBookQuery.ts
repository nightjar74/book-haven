import { and, count, eq, like } from "drizzle-orm";
import { db } from "@/database/drizzle";
import { books } from "@/database/schema";
import { BOOK_CATEGORIES } from "./bookCategories";

type Filters = {
  category: string;
  genre?: string;
  author?: string;
  page?: number;
  limit?: number;
};

export async function buildBookQuery(filters: Filters) {
  const { category, genre, author, page = 1, limit = 10 } = filters;

  let query = db.select().from(books).$dynamic();
  let countQuery = db.select({ total: count() }).from(books).$dynamic();

  const where: any[] = [];
  const meta: {
    orderBy?: any;
    limit?: number;
  } = {};

  const categoryHandler = BOOK_CATEGORIES[category];

  if (categoryHandler) {
    categoryHandler({ where, meta });
  } else {
    where.push(eq(books.genre, category));
  }

  if (genre) {
    where.push(eq(books.genre, genre));
  }

  if (author) {
    where.push(like(books.author, `%${author}%`));
  }

  if (where.length) {
    const conditions = and(...where);
    query = query.where(and(...where));
    countQuery = countQuery.where(conditions);
  }

  if (meta.orderBy) {
    query = query.orderBy(meta.orderBy);
  }

  const finalLimit = meta.limit ?? limit;

  const offset = (page - 1) * limit;
  query = query.limit(finalLimit).offset(offset);

  const [fetchedBooks, totalCountRes] = await Promise.all([query, countQuery]);

  return { query: fetchedBooks, countQuery: totalCountRes[0].total };
}
