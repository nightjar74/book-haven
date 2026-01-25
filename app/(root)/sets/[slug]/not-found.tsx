import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start bg-white p-6 text-center">
      <div className="space-y-4">
        <div className="flex flex-col font-ibm-serif text-6xl font-bold leading-none text-black">
          <span>Book</span>
          <span className="text-primary-admin">Haven</span>
        </div>

        <h2 className="text-2xl font-semibold text-gray-900 mt-8">
          Collection Not Found
        </h2>

        <p className="max-w-md text-gray-500">
          The curated set you're looking for doesn't exist in our library.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
          <Button
            asChild
            className="bg-black text-white hover:bg-gray-800 px-8"
          >
            <Link href="/">Return Home</Link>
          </Button>

          <Button asChild variant="outline" className="px-8">
            <Link href="/category/All%20Books">Browse All Books</Link>
          </Button>
        </div>
      </div>

      <div className="absolute bottom-0 opacity-5 -z-10">
        <h1 className="text-[20rem] font-bold">404</h1>
      </div>
    </main>
  );
}
