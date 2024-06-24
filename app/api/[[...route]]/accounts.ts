import { Hono } from "hono";

import { db } from "@/db/drizzle";
import { accounts } from "@/db/schema";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { eq } from "drizzle-orm";

const app = new Hono()
  // api/accouts/ is the base path here
  .get(
    "/", // GET /api/accounts/
    clerkMiddleware(), // requires authentication
    async (c) => {
      const auth = getAuth(c); // gets the auth object

      // if the user is not authenticated
      if (!auth?.userId) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      // gets all accounts
      const data = await db
        .select({
          id: accounts.id,
          name: accounts.name,
        })
        .from(accounts)
        .where(eq(accounts.userId, auth.userId));

      return c.json({ data }); // returns the data
    }
  );

export default app;
