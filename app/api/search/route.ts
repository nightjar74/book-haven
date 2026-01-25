import { db } from "@/database/drizzle";
import { books } from "@/database/schema";
import { ilike, like, sql } from "drizzle-orm";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q");

  if (!q || q.trim().length < 2) {
    return Response.json([]);
  }

  const results = await db
    .select()
    .from(books)
    .where(ilike(books.title, `%${q}%`))
    .limit(10);
  //console.log("results:", results, q);
  return Response.json(results);
}
