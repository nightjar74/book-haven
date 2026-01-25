import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

// visit http://localhost:3000/api/revalidate?tag=books in browser to clear book cache after seeding database

export async function GET(request: NextRequest) {
  const tag = request.nextUrl.searchParams.get("tag");

  if (!tag)
    return NextResponse.json({ message: "Missing tag" }, { status: 400 });

  revalidateTag(tag);
  return NextResponse.json({ revalidated: true, now: Date.now() });
}
