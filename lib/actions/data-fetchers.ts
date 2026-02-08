"use server";
import postgres from "postgres";
import { db } from "@/database/drizzle";
import {
  books,
  borrowRecords,
  users,
  borrowRequests,
  collectionBooks,
  collections,
  receipts,
} from "@/database/schema";
import {
  count,
  eq,
  ilike,
  inArray,
  or,
  gte,
  lte,
  and,
  desc,
  ne,
  asc,
  max,
} from "drizzle-orm";
import { getDate } from "../utils";
import { Book, requestParams } from "@/types";
import { cache } from "react";
import { revalidatePath, unstable_cache } from "next/cache";
import { auth } from "@/auth";

export interface User {
  id: string | any;
  full_name: string | any;
  email: string | any;
  role: "USER" | "ADMIN" | null;
}

export interface Borrow {
  id: string;
  status: "BORROWED" | "RETURNED";
  createdAt: Date | null;
  userId: string;
  bookId: string;
  borrowDate: Date;
  dueDate: string;
  returnDate: string | null;
}

export interface RequestWithUser {
  id: string;
  title: string;
  author: string;
  publisher: string;
  status: string;
  createdAt: Date | null;
  userEmail: string;
}
export interface ChartDataPoint {
  date: string;
  count: number;
}

const sql = postgres(process.env.DATABASE_URL!);

export async function getAllUsers(): Promise<User[]> {
  try {
    const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
    await delay(2000);
    //throw new Error("Test error");
    const allUsers = await db.select().from(users);
    const userData = allUsers.map((user) => {
      return {
        id: user.id,
        full_name: user.fullName,
        email: user.email,
        role: user.role,
      };
    });
    return userData;
  } catch (error) {
    console.error("Failed to fetch users:", error);
    throw new Error("Failed to fetch users");
  }
}

export async function getBorrowActivity(): Promise<Borrow[]> {
  try {
    const records = await db.select().from(borrowRecords);
    return records as Borrow[];
  } catch (error) {
    console.error("Failed to fetch borrow activity:", error);
    throw new Error("Failed to fetch borrow activity");
  }
}

export async function getBorrowRecords(
  year?: string,
): Promise<ChartDataPoint[]> {
  try {
    const selectedYear = year || new Date().getFullYear().toString();
    const startDate = new Date(`${selectedYear}-01-01`);
    const endDate = new Date(`${selectedYear}-12-31`);
    const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
    await delay(2000);
    //throw new Error("Test error");
    const borrowRecord = await db
      .select()
      .from(borrowRecords)
      .where(
        and(
          eq(borrowRecords.status, "BORROWED"),
          gte(borrowRecords.borrowDate, startDate),
          lte(borrowRecords.borrowDate, endDate),
        ),
      );
    const aggregatedData: Record<string, number> = {};

    borrowRecord.forEach((book) => {
      const formattedDate = getDate(book.borrowDate);

      if (aggregatedData[formattedDate]) {
        aggregatedData[formattedDate] += 1;
      } else {
        aggregatedData[formattedDate] = 1;
      }
    });

    const chartData = Object.keys(aggregatedData).map((date) => ({
      date: date,
      count: aggregatedData[date],
    }));
    return chartData as ChartDataPoint[];
  } catch (error) {
    console.error("Failed to fetch users:", error);
    throw new Error("Failed to fetch borrow records");
  }
}

export const getBorrowedBooks = cache(async (): Promise<Book[]> => {
  return await unstable_cache(
    async () => {
      try {
        const booksResult = await db.select().from(books);
        return booksResult;
      } catch (error) {
        console.error("Failed to get books from database:", error);
        throw new Error(
          `Failed to retrieve books: ${error instanceof Error ? error.message : String(error)}`,
        );
      }
    },
    ["all-books-list"],
    {
      tags: ["books"],
      revalidate: 3600,
    },
  )();
});

export const getBorrowHistory = cache(
  async ({
    userId,
    limit = 10,
    page = 1,
  }: {
    userId?: string;
    limit?: number;
    page?: number;
  } = {}) => {
    const session = await auth();
    const isAdmin = session?.user?.role === "ADMIN";

    const isAuthorized = isAdmin || (userId && session?.user?.id === userId);

    if (!isAuthorized) {
      throw new Error("Unauthorized access");
    }
    const offset = (page - 1) * limit;
    const cacheKey = `borrow-activity-${userId || "all"}-p${page}-l${limit}`;

    return await unstable_cache(
      async () => {
        try {
          const query = db
            .select({
              book: books,
              count: count(borrowRecords.id),
              borrowDate: max(borrowRecords.borrowDate),
              dueDate: max(borrowRecords.dueDate),
              status: max(borrowRecords.status),
              userId: borrowRecords.userId,
            })
            .from(borrowRecords)
            .innerJoin(books, eq(borrowRecords.bookId, books.id))
            .groupBy(books.id, borrowRecords.userId)
            .limit(limit)
            .offset(offset);

          if (userId) {
            query.where(eq(borrowRecords.userId, userId));
          }

          const result = await query;
          return result;
        } catch (error) {
          console.error("Failed to fetch borrow activity:", error);
          return [];
        }
      },
      [cacheKey],
      { tags: ["borrow-records", "books"], revalidate: 3600 },
    )();
  },
);

export const getBooksForUsers = cache(async (userIds: string[]) => {
  if (userIds.length === 0) return [];

  return await unstable_cache(
    async () => {
      const results = await db
        .select({
          //userId: borrowRecords.userId,
          //dueDate: borrowRecords.dueDate,
          book: books,
        })
        .from(borrowRecords)
        .innerJoin(books, eq(borrowRecords.bookId, books.id))
        .where(inArray(borrowRecords.userId, userIds));

      return results;
    },
    ["user-borrowed-books", userIds.join(",")],
    { tags: ["borrow-records", "books"], revalidate: 3600 },
  )();
});

export const getBooksByGenre = async (genreQuery: string): Promise<Book[]> => {
  return await unstable_cache(
    async () => {
      try {
        const booksResult = await db
          .select()
          .from(books)
          .where(ilike(books.genre, `%${genreQuery}%`))
          .orderBy(desc(books.createdAt));

        return booksResult as Book[];
      } catch (error) {
        console.error("Database Error:", error);
        return [];
      }
    },
    ["books-by-genre", genreQuery],
    {
      tags: ["books"],
      revalidate: 3600,
    },
  )();
};

export const getBooksByGenres = async (
  genreQueries: string[],
): Promise<Book[]> => {
  const cacheKey = genreQueries.sort().join("-");

  return await unstable_cache(
    async () => {
      try {
        const genreFilters = genreQueries.map((genre) =>
          ilike(books.genre, `%${genre}%`),
        );

        const booksResult = await db
          .select()
          .from(books)
          .where(or(...genreFilters))
          .orderBy(desc(books.createdAt));

        return booksResult as Book[];
      } catch (error) {
        console.error("Database Error:", error);
        return [];
      }
    },
    ["books-by-genres", cacheKey],
    {
      tags: ["books"],
      revalidate: 3600,
    },
  )();
};

export const getBook = cache(async (slug: string): Promise<Book> => {
  try {
    const data = await sql`
      SELECT 
        id, 
        title, 
        author, 
        genre, 
        rating,
        cover_url AS "coverUrl", 
        cover_color AS "coverColor", 
        description, 
        total_copies AS "totalCopies", 
        available_copies AS "availableCopies", 
        summary,
        created_at AS "createdAt"
      FROM books
      WHERE lower(
        replace(
          regexp_replace(title, '[^a-zA-Z0-9\\s]', '', 'g'), 
          ' ', 
          '-'
        )
      ) = ${slug.toLowerCase()}
      LIMIT 1
    `;

    const book = data[0] as Book;

    return book;
  } catch (error) {
    console.error("Error fetching book by title with raw SQL:", error);
    return {} as Book;
  }
});

export const getCommonBooks = cache(
  async (genre: string, excludeTitle: string): Promise<Book[]> => {
    try {
      const data = await db
        .select()
        .from(books)
        .where(and(eq(books.genre, genre), ne(books.title, excludeTitle)))
        .orderBy(desc(books.createdAt))
        .limit(10);

      return data as Book[];
    } catch (error) {
      console.error("Error fetching common books:", error);
      return [];
    }
  },
);

export const getBooks = cache(
  async (
    query: string = "",
    page: number = 1,
    limit: number = 10,
  ): Promise<Book[]> => {
    const offset = (page - 1) * limit;

    return await unstable_cache(
      async () => {
        try {
          await new Promise((res) => setTimeout(res, 3000));
          const booksResult = await db
            .select()
            .from(books)
            .where(ilike(books.title, `%${query}%`))
            .limit(limit)
            .offset(offset);

          return booksResult;
        } catch (error) {
          console.error("Failed to get books from database:", error);
          throw new Error("Failed to retrieve books");
        }
      },
      ["books-list", query, page.toString(), limit.toString()],
      {
        tags: ["books"],
        revalidate: 3600,
      },
    )();
  },
);

export const getBooksCount = cache(async (query: string): Promise<number> => {
  const searchPattern = `%${query.trim()}%`;

  return await unstable_cache(
    async () => {
      try {
        const result = await db
          .select({ value: count() })
          .from(books)
          .where(
            or(
              ilike(books.title, searchPattern),
              ilike(books.author, searchPattern),
            ),
          );

        return Number(result[0].value);
      } catch (error) {
        console.error("Failed to fetch total book count:", error);
        throw new Error("Failed to fetch total book count.");
      }
    },
    ["books-count", query],
    {
      tags: ["books"],
      revalidate: 3600,
    },
  )();
});
//const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const getRequests = cache(async (): Promise<RequestWithUser[]> => {
  return await unstable_cache(
    async () => {
      try {
        await new Promise((res) => setTimeout(res, 500));

        const requests = await db
          .select({
            id: borrowRequests.id,
            title: borrowRequests.title,
            author: borrowRequests.author,
            publisher: borrowRequests.publisher,
            status: borrowRequests.status,
            createdAt: borrowRequests.createdAt,
            userEmail: users.email,
          })
          .from(borrowRequests)
          .leftJoin(users, eq(borrowRequests.userId, users.id));

        return requests as RequestWithUser[];
      } catch (error) {
        console.error("Failed to fetch requests:", error);
        throw new Error("Failed to fetch requests");
      }
    },
    ["borrow-requests-list"],
    {
      tags: ["borrow-requests"],
      revalidate: 3600,
    },
  )();
});

export const getFilteredUsers = async (
  query: string,
  currentPage: number,
  isAdminOnly: boolean = false,
) => {
  console.log(query, currentPage, "query currentpage");
  const ITEMS_PER_PAGE = 4;
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  return await unstable_cache(
    async () => {
      try {
        const searchPattern = `%${query.trim()}%`;
        //console.log("searchPattern here:", searchPattern);
        const dataPromise = sql`
            SELECT id, full_name, email, role
            FROM users
            WHERE (
              full_name ILIKE ${searchPattern} OR 
              email ILIKE ${searchPattern}
            )
            AND (${isAdminOnly} = false OR role = 'ADMIN')
            ORDER BY full_name ASC
            LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
          `;

        const countPromise = sql`SELECT COUNT(*)
            FROM users
            WHERE (full_name ILIKE ${searchPattern} OR email ILIKE ${searchPattern})
            AND (${isAdminOnly} = false OR role = 'ADMIN')`;

        const [data, countResult] = await Promise.all([
          dataPromise,
          countPromise,
        ]);

        const totalCount = Number(countResult[0].count);
        const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

        return {
          users: data,
          totalPages: totalPages,
        };
      } catch (error) {
        console.error("Database Error:", error);
        throw new Error("Failed to fetch filtered users.");
      }
    },
    [
      "users-list",
      query.toString(),
      currentPage.toString(),
      isAdminOnly.toString(),
    ],
    {
      tags: ["users-cache"],
      revalidate: 3600,
    },
  )();
};

export const getUsersCount = cache(async (query: string) => {
  const searchPattern = `%${query.trim()}%`;

  return await unstable_cache(
    async () => {
      try {
        const count = await sql`
          SELECT COUNT(*)
          FROM users
          WHERE full_name ILIKE ${searchPattern} OR email ILIKE ${searchPattern}
        `;
        return Number(count[0].count);
      } catch (error) {
        throw new Error("Failed to fetch total user count.");
      }
    },
    ["users-count", query],
    {
      tags: ["users-cache"],
      revalidate: 3600,
    },
  )();
});

export const getCollectionBySlug = unstable_cache(
  async (slug: string) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      const collection = await db.query.collections.findFirst({
        where: (cols, { eq, sql }) => eq(sql`${cols.title}`, slug),
      });

      if (!collection) return null;

      const results = await db
        .select({
          id: books.id,
          title: books.title,
          genre: books.genre,
          author: books.author,
          coverColor: books.coverColor,
          coverUrl: books.coverUrl,
        })
        .from(collectionBooks)
        .innerJoin(books, eq(collectionBooks.bookId, books.id))
        .where(eq(collectionBooks.collectionId, collection.id));

      return results;
    } catch (error) {
      console.error("Error fetching collection books:", error);
      return null;
    }
  },
  ["collection-by-slug"],
  {
    tags: ["collections-tag"],
    revalidate: 3600,
  },
);

export const getCollections = unstable_cache(
  async () => {
    try {
      const data = await db
        .select({
          setNo: collections.setNo,
          title: collections.title,
          subtitle: collections.subtitle,
          imageSrc: collections.imageSrc,
        })
        .from(collections)
        .orderBy(asc(collections.setNo));

      return data;
    } catch (error) {
      console.error("Error fetching admin collections:", error);
      return [];
    }
  },
  ["admin-collections-list"],
  {
    tags: ["collections-tag"],
  },
);

export const getCollectionsWithBookIds = unstable_cache(
  async () => {
    try {
      const allCollections = await db
        .select()
        .from(collections)
        .orderBy(asc(collections.setNo));

      const allLinks = await db.select().from(collectionBooks);

      return allCollections.map((col) => ({
        ...col,
        bookIds: allLinks
          .filter((link) => link.collectionId === col.id)
          .map((link) => link.bookId),
      }));
    } catch (error) {
      console.error("Error fetching collections with book IDs:", error);
      return [];
    }
  },
  ["admin-collections-with-ids"],
  { tags: ["collections-tag"] },
);

export const getReceipts = cache(
  async (query: string = "", page: number = 1, limit: number = 10) => {
    const offset = (page - 1) * limit;

    return await unstable_cache(
      async () => {
        try {
          const receiptsResult = await db
            .select()
            .from(receipts)
            .where(
              or(
                ilike(receipts.bookTitle, `%${query}%`),
                ilike(receipts.userName, `%${query}%`),
                ilike(receipts.userEmail, `%${query}%`),
              ),
            )
            .limit(limit)
            .offset(offset)
            .orderBy(desc(receipts.createdAt));

          return receiptsResult;
        } catch (error) {
          console.error("Failed to get receipts from database:", error);
          return [];
        }
      },
      ["receipts-list", query, page.toString(), limit.toString()],
      {
        tags: ["borrow-records"],
        revalidate: 3600,
      },
    )();
  },
);

export const getReceiptsCount = cache(
  async (query: string = ""): Promise<number> => {
    const searchPattern = `%${query.trim()}%`;

    return await unstable_cache(
      async () => {
        try {
          const result = await db
            .select({ value: count() })
            .from(receipts)
            .where(
              or(
                ilike(receipts.bookTitle, searchPattern),
                ilike(receipts.userName, searchPattern),
                ilike(receipts.userEmail, searchPattern),
              ),
            );

          return Number(result[0].value);
        } catch (error) {
          console.error("Failed to fetch total receipts count:", error);
          return 0;
        }
      },
      ["receipts-count", query],
      {
        tags: ["borrow-records"],
        revalidate: 3600,
      },
    )();
  },
);
