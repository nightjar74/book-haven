import ImageKit from "imagekit";
import { books, users } from "@/database/schema";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { config } from "dotenv";
import { Vibrant } from "node-vibrant/node";
import { eq } from "drizzle-orm";
import { hash } from "bcryptjs";
import fs from "fs";
import path from "path";
import { stripHtml } from "@/lib/utils";

config({ path: ".env.local" });

const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle({ client: sql });

const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
});
// set to true to verify data without making changes to database
const DRY_RUN = true;

const ISBNs = [
  9780141439518, // Pride and Prejudice
  9780451524935, // 1984
  9780736444651, // The Lion King
  9781546176206, // Dog Man: Big Jim Believes
  9780369704436, // The Long Game
  9781604334753, // the jungle book
];

const seed = async () => {
  console.log(DRY_RUN ? "🔍 DRY RUN MODE" : "🌱 STARTING SEED...");

  // SEED USERS
  const password = "12345678";
  const hashedPassword = await hash(password, 10);
  const seedUsers = [
    {
      fullName: "Admin User",
      email: "admin@library.com",
      password: hashedPassword,
      role: "ADMIN" as const,
    },
    {
      fullName: "Regular User",
      email: "user@library.com",
      password: hashedPassword,
      role: "USER" as const,
    },
  ];

  if (!DRY_RUN) {
    for (const u of seedUsers) {
      const existing = await db
        .select()
        .from(users)
        .where(eq(users.email, u.email));
      if (existing.length === 0) {
        await db.insert(users).values(u);
        console.log(`✅ User created: ${u.email}`);
      }
    }
  }

  console.log("📦 Seeding local JSON books...");
  try {
    const rawData = fs.readFileSync(
      path.join(process.cwd(), "dummybooks.json"),
      "utf-8",
    );
    console.log("Rawdata:", rawData);
    const localBooks = JSON.parse(rawData);

    for (const book of localBooks) {
      if (!DRY_RUN) {
        const existing = await db
          .select()
          .from(books)
          .where(eq(books.title, book.title));
        if (existing.length === 0) {
          await db.insert(books).values({
            ...book,
            description: stripHtml(book.description),
            summary: stripHtml(book.summary || book.description).substring(
              0,
              500,
            ),
            createdAt: new Date(),
          });
          console.log(`✅ Seeded (JSON): ${book.title}`);
        }
      }
    }
  } catch (error) {
    console.error("❌ Error loading dummybooks.json:", error);
  }

  console.log("📡 Fetching and seeding API books...");
  for (const isbn of ISBNs) {
    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`,
      );
      const data = await response.json();
      if (!data.items?.length) continue;

      const info = data.items[0].volumeInfo;
      const title = info.title;
      let googleThumb = info.imageLinks?.thumbnail?.replace(
        "http://",
        "https://",
      );

      let coverUrl = "DRY_RUN_PATH";
      let coverColor = "#012B5B";

      if (googleThumb) {
        googleThumb = googleThumb.replace("zoom=1", "zoom=3");
        const imgResponse = await fetch(googleThumb);
        const buffer = Buffer.from(await imgResponse.arrayBuffer());

        try {
          const palette = await Vibrant.from(buffer).getPalette();
          coverColor = palette.Vibrant?.hex || palette.Muted?.hex || coverColor;
        } catch (e) {}

        if (!DRY_RUN) {
          const upload = await imagekit.upload({
            file: buffer,
            fileName: `${title.replace(/\s+/g, "-")}.jpg`,
            folder: "/books/covers",
          });
          coverUrl = upload.filePath;
        }
      }

      if (!DRY_RUN) {
        const existing = await db
          .select()
          .from(books)
          .where(eq(books.title, title));
        if (existing.length === 0) {
          await db.insert(books).values({
            title,
            author: info.authors?.join(", ") || "Unknown",
            genre: info.categories?.[0] || "General",
            rating: Math.round(info.averageRating || 4),
            coverUrl,
            coverColor,
            description: stripHtml(info.description || ""),
            summary: stripHtml(info.description || "").substring(0, 500),
            totalCopies: 10,
            availableCopies: 10,
            borrowCount: 0,
          });
          console.log(`✅ Seeded (API): ${title}`);
        }
      }

      if (DRY_RUN) {
        console.log(`\n🔍 [DRY RUN] Would seed: ${title}`);
        console.log({
          title,
          author: info.authors?.join(", ") || "Unknown",
          genre: info.categories?.[0] || "General",
          rating: Math.round(info.averageRating || 4),
          coverUrl,
          coverColor,
          descriptionSnippet:
            stripHtml(info.description || "").substring(0, 100) + "...",
          summaryLength: stripHtml(info.description || "").substring(0, 500)
            .length,
          totalCopies: 10,
          availableCopies: 10,
          borrowCount: 0,
        });
        console.log("-----------------------------------");
      }

      await new Promise((res) => setTimeout(res, 1000));
    } catch (error) {
      console.error(`❌ Error with ISBN ${isbn}:`, error);
    }
  }

  console.log("🏁 Seeding complete!");
};

seed();
