"use server";

import { db } from "@/database/drizzle";
import { receipts } from "@/database/schema";
import { inArray } from "drizzle-orm";
import { revalidateTag } from "next/cache";

export const deleteSelectedReceipts = async (ids: string[]) => {
  try {
    if (!ids || ids.length === 0)
      return { success: false, error: "No IDs provided" };

    await db.delete(receipts).where(inArray(receipts.id, ids));

    revalidateTag("borrow-records");

    return { success: true };
  } catch (error) {
    console.error("Delete Error:", error);
    return { success: false, error: "Failed to delete selected receipts" };
  }
};

export const clearAllReceipts = async () => {
  try {
    await db.delete(receipts);

    revalidateTag("borrow-records");

    return { success: true };
  } catch (error) {
    console.error("Clear All Error:", error);
    return { success: false, error: "Failed to clear all receipts" };
  }
};
