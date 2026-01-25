"use server";

import { db } from "@/database/drizzle";
import { borrowRequests } from "@/database/schema";
import { requestParams } from "@/types";
import { revalidateTag } from "next/cache";

const createRequest = async (params: requestParams) => {
  //console.log("called create request", params);
  try {
    const newRequest = await db
      .insert(borrowRequests)
      .values({
        title: params.title,
        author: params.author,
        publisher: params.publisher,
        userId: params.userId,
        status: "PENDING",
      })
      .returning();

    revalidateTag("borrow-requests");

    return {
      success: true,
      data: JSON.parse(JSON.stringify(newRequest[0])),
    };
  } catch (error) {
    console.error("Database Error:", error);

    return {
      success: false,
      message: "An error occurred while submitting the borrow request",
    };
  }
};

export default createRequest;
