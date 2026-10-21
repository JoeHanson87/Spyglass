import { boolean, date, integer, pgTable, serial, text, timestamp, time } from "drizzle-orm/pg-core";

export const menuCategories = pgTable("menu_categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  sort: integer("sort").notNull().default(0),
});

export const menuItems = pgTable("menu_items", {
  id: serial("id").primaryKey(),
  categoryId: integer("category_id").notNull().references(() => menuCategories.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  description: text("description").notNull().default(""),
  price: text("price").notNull().default(""),
  tag: text("tag").notNull().default(""),
  available: boolean("available").notNull().default(true),
  sort: integer("sort").notNull().default(0),
});

export const events = pgTable("events", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  category: text("category").notNull().default("event"),
  date: date("date", { mode: "string" }).notNull(),
  startTime: time("start_time").notNull().default("19:00"),
  description: text("description").notNull().default(""),
  image: text("image").notNull().default(""),
  published: boolean("published").notNull().default(true),
});

export const specialNights = pgTable("special_nights", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  weekday: integer("weekday").notNull(),
  startTime: time("start_time").notNull().default("19:00"),
  description: text("description").notNull().default(""),
  image: text("image").notNull().default(""),
  active: boolean("active").notNull().default(true),
});

export const menuPdfs = pgTable("menu_pdfs", {
  id: serial("id").primaryKey(),
  label: text("label").notNull(),
  url: text("url").notNull(),
  isPrimary: boolean("is_primary").notNull().default(false),
  uploadedAt: timestamp("uploaded_at").notNull().defaultNow(),
});

export const settings = pgTable("settings", {
  key: text("key").primaryKey(),
  value: text("value").notNull().default(""),
});
