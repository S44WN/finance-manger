import { createInsertSchema } from "drizzle-zod";
import { pgTable, text } from "drizzle-orm/pg-core";

export const accounts = pgTable("accounts", {
  id: text("id").primaryKey(),
  plaidId: text("plaid_id"),
  name: text("name").notNull(),
  userId: text("user_id").notNull(),
});

/* 

Generating Insert Schema with createInsertSchema: The createInsertSchema function takes the accounts table definition as input and generates a Zod schema. This schema reflects the structure and constraints of the accounts table, tailored for validating data for insert operations.

Usage of the Generated Schema: The generated Zod schema (insertAccountSchema) can be used to validate data objects before they are inserted into the accounts table. This ensures that the data conforms to the expected structure, types, and constraints defined in the table schema.
 */
export const insertAccountSchema = createInsertSchema(accounts);
