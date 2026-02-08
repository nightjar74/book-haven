"use server";

import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { eq } from "drizzle-orm";
import { revalidatePath, revalidateTag } from "next/cache";

export async function deleteUser(userId: string) {
  try {
    await db.delete(users).where(eq(users.id, userId));

    revalidateTag("users-cache");
    revalidatePath("/admin/users");

    return { success: true, message: "User deleted successfully" };
  } catch (error) {
    console.error("Delete Error:", error);
    return { success: false, message: "Failed to delete user" };
  }
}
