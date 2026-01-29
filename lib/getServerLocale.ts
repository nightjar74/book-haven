import { cookies } from "next/headers";

export async function getServerLocale() {
  const cookieStore = await cookies();
  return cookieStore.get("NEXT_LOCALE")?.value || "en";
}
