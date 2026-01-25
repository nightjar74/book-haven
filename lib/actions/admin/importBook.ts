"use server";

import { db } from "@/database/drizzle";
import { books } from "@/database/schema";
import { Vibrant } from "node-vibrant/node";
import ImageKit from "imagekit";
import { revalidatePath } from "next/cache";
import { stripHtml } from "@/lib/utils";

const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
});

export const importBookById = async (googleBookId: string) => {
  try {
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes/${googleBookId}`,
    );
    const item = await response.json();
    const info = item.volumeInfo;

    const title = info.title;
    const isbn13 = info.industryIdentifiers?.find(
      (i: any) => i.type === "ISBN_13",
    )?.identifier;

    let imageUrl =
      info.imageLinks?.thumbnail?.replace("http://", "https://") ||
      (isbn13 ? `https://covers.openlibrary.org/b/isbn/${isbn13}-L.jpg` : null);

    let coverUrl = "";
    let coverColor = "#012B5B";

    if (imageUrl) {
      const highResUrl = imageUrl.includes("google")
        ? imageUrl.replace("zoom=1", "zoom=3")
        : imageUrl;
      const imgRes = await fetch(highResUrl);
      const buffer = Buffer.from(await imgRes.arrayBuffer());

      const palette = await Vibrant.from(buffer).getPalette();
      coverColor = palette.Vibrant?.hex || coverColor;

      const upload = await imagekit.upload({
        file: buffer,
        fileName: `${title.replace(/\s+/g, "-")}.jpg`,
        folder: "/books/covers",
      });
      coverUrl = upload.filePath;
    }

    const description = stripHtml(
      info.description || "No description available.",
    );
    const summary = stripHtml(
      info.summary || "No summary available.",
    ).substring(0, 500);

    //console.log("summary: ", summary);
    //console.log("description: ", description);

    await db.insert(books).values({
      title,
      author: info.authors?.join(", ") || "Unknown Author",
      genre: info.categories?.[0] || "General",
      rating: Math.round(info.averageRating || 4),
      coverUrl,
      coverColor,
      description: description,
      summary: summary,
      totalCopies: 10,
      availableCopies: 10,
      borrowCount: 0,
      createdAt: new Date(),
    });

    revalidatePath("/admin/books");
    return { success: true, title };
  } catch (error: any) {
    console.error(error);
    return { success: false, message: error.message };
  }
};
