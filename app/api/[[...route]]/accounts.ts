import { Hono } from "hono";

import { db } from "@/db/drizzle";
import { accounts } from "@/db/schema";

const app = new Hono()
  // api/accouts/ is the base path here
  .get("/", async (c) => {
    // gets all accounts
    const data = await db
      .select({
        id: accounts.id,
        name: accounts.name,
      })
      .from(accounts);

    return c.json({ data }); // returns the data
  });

export default app;
