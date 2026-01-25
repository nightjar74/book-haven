CREATE TABLE "collection_books" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"collection_id" uuid NOT NULL,
	"book_id" uuid NOT NULL,
	CONSTRAINT "collection_books_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE "collections" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"set_no" varchar(10) NOT NULL,
	"title" varchar(255) NOT NULL,
	"subtitle" text,
	"image_src" text,
	"updated_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "collections_id_unique" UNIQUE("id"),
	CONSTRAINT "collections_set_no_unique" UNIQUE("set_no")
);
--> statement-breakpoint
ALTER TABLE "collection_books" ADD CONSTRAINT "collection_books_collection_id_collections_id_fk" FOREIGN KEY ("collection_id") REFERENCES "public"."collections"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "collection_books" ADD CONSTRAINT "collection_books_book_id_books_id_fk" FOREIGN KEY ("book_id") REFERENCES "public"."books"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "collection_book_unique" ON "collection_books" USING btree ("collection_id","book_id");