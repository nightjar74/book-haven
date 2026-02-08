import { auth } from "@/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
//import ratelimit from "@/lib/ratelimit";
//export { auth as middleware } from "@/auth";

export default auth(async function middleWare(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  /*   const isExcludedRoute =
    pathname.startsWith("/_next") ||
    pathname.startsWith("/too-fast") ||
    pathname === "/favicon.ico"; */

  const page = searchParams.get("page");
  //console.log("Middleware page param:", page);
  if (page) {
    const pageNum = Number(page);
    if (isNaN(pageNum) || page.includes("e") || pageNum > 100000) {
      const url = request.nextUrl.clone();
      url.searchParams.set("page", "1");
      return NextResponse.redirect(url);
    }
  }
  /* 
  if (!isExcludedRoute) {
    const ip =
      request.headers.get("x-forwarded-for") ??
      request.headers.get("x-real-ip") ??
      "127.0.0.1";

    const { isLimited, secondsToWait } = await ratelimit(ip);
    console.log("Identifying as:", ip);

    if (isLimited) {
      const url = new URL("/too-fast", request.url);
      url.searchParams.set("wait", secondsToWait.toString());
      return NextResponse.redirect(url);
    }
  } */

  return NextResponse.next();
});

/* export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|too-fast).*)"],
}; */
