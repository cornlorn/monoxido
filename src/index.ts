import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { logger } from "hono/logger";

const db = {
  count: 0
};

const app = new Hono();

app.use("*", logger());

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.get("/count", (c) => {
  db.count++;
  return c.json({ count: db.count });
});

serve(
  {
    fetch: app.fetch,
    port: 3000
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  }
);
