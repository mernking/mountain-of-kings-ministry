import { pgTable, text, timestamp, uuid, jsonb, date } from "drizzle-orm/pg-core";

export const projects = pgTable("projects", {
  id: uuid("id").primaryKey().defaultRandom(),
  slug: text("slug").unique().notNull(),
  title: text("title").notNull(),
  category: text("category").notNull(),
  status: text("status").notNull().default("Active"),
  description: text("description"),
  contentBlocks: jsonb("content_blocks").notNull().default([]),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const programmes = pgTable("programmes", {
  id: uuid("id").primaryKey().defaultRandom(),
  slug: text("slug").unique().notNull(),
  title: text("title").notNull(),
  category: text("category").notNull(),
  status: text("status").notNull().default("Upcoming"),
  date: date("date"), // Primary or display date
  schedule: jsonb("schedule").notNull().default([]), // Array of { date, startTime, endTime }
  location: text("location").notNull(),
  description: text("description"),
  contentBlocks: jsonb("content_blocks").notNull().default([]),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const inquiries = pgTable("inquiries", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  reason: text("reason").notNull(),
  subject: text("subject"),
  message: text("message").notNull(),
  status: text("status").notNull().default("pending"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
