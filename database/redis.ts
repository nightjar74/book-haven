import { Redis } from "@upstash/redis";
import { serverConfig } from "@/lib/serverConfig";

const redis = new Redis({
  url: serverConfig.env.upstash.redisUrl,
  token: serverConfig.env.upstash.redisToken,
});

export default redis;
