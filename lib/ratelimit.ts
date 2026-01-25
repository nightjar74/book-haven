/* import { Ratelimit } from "@upstash/ratelimit";
import redis from "@/database/redis"; */

/* const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.fixedWindow(5, "1m"),
  analytics: true,
  prefix: "@upstash/ratelimit",
});

export default ratelimit; */

/* export const ratelimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.fixedWindow(5, "1m"),
  analytics: true,
  prefix: "@upstash/ratelimit",
});

export default async function ratelimit(identifier: string) {
  const { success, reset } = await ratelimiter.limit(identifier);

  if (!success) {
    const secondsToWait = Math.ceil((reset - Date.now()) / 1000);
    return { isLimited: true, secondsToWait };
  }

  return { isLimited: false, secondsToWait: 0 };
} */
