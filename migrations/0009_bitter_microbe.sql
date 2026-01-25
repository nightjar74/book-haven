CREATE TABLE "receipts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"user_name" text NOT NULL,
	"user_email" text NOT NULL,
	"book_title" text NOT NULL,
	"created_at" timestamp DEFAULT now()
);
