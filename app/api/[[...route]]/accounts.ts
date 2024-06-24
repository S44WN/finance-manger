import { Hono } from "hono";

import { zValidator } from "@hono/zod-validator";
import { db } from "@/db/drizzle";
import { accounts, insertAccountSchema } from "@/db/schema";
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
  )
  .post(
    "/", // POST /api/accounts/
    clerkMiddleware(),
    zValidator(
      "json",
      // only the name is required because -
      //the userId is taken from the auth object
      insertAccountSchema.pick({
        name: true,
      })
    ),
    async (c) => {
      const auth = getAuth(c);

      //get the data from the request body
      const values = c.req.valid("json");

      if (!auth?.userId) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      // inserts the account into the database

      const data = await db.insert(accounts).values({
        id: "testid", // this is a placeholder
        userId: auth.userId,
        name: values.name,
      });

      // gets the data from the request body
    }
  );

export default app;
