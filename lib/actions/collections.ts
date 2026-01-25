"use server";

import { db } from "@/database/drizzle";
import { collections, collectionBooks } from "@/database/schema";
import { eq } from "drizzle-orm";
import { revalidatePath, revalidateTag } from "next/cache";

export async function updateAdminCollections(data: any[]) {
  try {
    const queries: any[] = [];

    for (const item of data) {
      const upsertQuery = db
        .insert(collections)
        .values({
          setNo: item.setNo,
          title: item.title,
          subtitle: item.subtitle,
          imageSrc: item.imageSrc,
        })
        .onConflictDoUpdate({
          target: collections.setNo,
          set: {
            title: item.title,
            subtitle: item.subtitle,
            imageSrc: item.imageSrc,
            updatedAt: new Date(),
          },
        })
        .returning();

      queries.push(upsertQuery);
    }

    const upsertResults = await db.batch(queries as any);

    const syncQueries: any[] = [];

    upsertResults.forEach((updatedCollection: any, index: number) => {
      const collectionId = updatedCollection[0].id;
      const bookIds = data[index].bookIds;

      syncQueries.push(
        db
          .delete(collectionBooks)
          .where(eq(collectionBooks.collectionId, collectionId)),
      );

      if (bookIds && bookIds.length > 0) {
        syncQueries.push(
          db.insert(collectionBooks).values(
            bookIds.map((bid: string) => ({
              collectionId,
              bookId: bid,
            })),
          ),
        );
      }
    });

    if (syncQueries.length > 0) {
      await db.batch(syncQueries as any);
    }

    revalidateTag("collections-tag");
    revalidatePath("/");
    revalidatePath("/admin/collections");

    return { success: true };
  } catch (error) {
    console.error("Database Update Error:", error);
    return { success: false, error: "Failed to update collections" };
  }
}
