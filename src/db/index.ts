import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

export const hasDb = Boolean(process.env.DATABASE_URL);

export const db = drizzle(neon(process.env.DATABASE_URL ?? "postgres://user:pass@localhost/none"), { schema });
export { schema };
