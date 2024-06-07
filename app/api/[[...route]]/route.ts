import z from "zod";
import { Hono } from "hono";
import { handle } from "hono/vercel";
import { zValidator } from "@hono/zod-validator";

export const runtime = "edge";

const app = new Hono().basePath("/api");

app
  .get("/hello", (c) => {
    return c.json({
      message: "Hello Next.js!",
    });
  })

  .get(
    "/hello/:name", // can be accessed via c.req.params

    /* 
    zValidator - validates the request parameters
    - The first argument is the name of the request parameter
    - The second argument is the schema to validate the request parameter
    */

    // middleware
    zValidator(
      "param",
      z.object({
        name: z.string(),
      })
    ),
    (c) => {
      const { name } = c.req.valid("param"); // .valid - returns the validated request parameter

      return c.json({
        message: `Hello ${name}!`,
      });
    }
  );

export const GET = handle(app);
export const POST = handle(app);
