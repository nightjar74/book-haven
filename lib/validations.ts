import { z } from "zod";

export const BookQuantitySchema = z
  .object({
    totalCopies: z.coerce.number().min(1, "Must be at least 1"),
    availableCopies: z.coerce.number().min(0, "Cannot be negative"),
  })
  .refine((data) => data.availableCopies <= data.totalCopies, {
    message: "Available copies cannot exceed total copies",
    path: ["availableCopies"],
  });

export const signUpSchema = z.object({
  fullName: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8),
});

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const bookSchema = z.object({
  title: z.string().trim().min(2).max(100),
  description: z.string().trim().min(10).max(1000),
  author: z.string().trim().min(2).max(100),
  genre: z.string().trim().min(2).max(50),
  rating: z.coerce.number().min(1).max(5),
  totalCopies: z.coerce.number().int().positive().lte(10000),
  coverUrl: z.string().nonempty(),
  coverColor: z
    .string()
    .trim()
    .regex(/^#[0-9A-F]{6}$/i),
  summary: z.string().trim().min(10),
});

export const requestFormSchema = z.object({
  title: z.string().min(2, {
    message: "Book title must be at least 2 characters.",
  }),
  author: z.string().min(2, {
    message: "Author name must be at least 2 characters.",
  }),
  publisher: z
    .string()
    .min(2, {
      message: "Publisher must be at least 2 characters.",
    })
    .optional(),
});
