import { serverConfig } from "@/lib/serverConfig";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "@/database/schema";

const sql = neon(serverConfig.env.databaseUrl);

export const db = drizzle({ client: sql, schema, casing: "snake_case" });
