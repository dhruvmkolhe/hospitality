import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const rooms = sqliteTable("rooms", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  category: text("category").notNull(),
  description: text("description").notNull(),
  longDescription: text("long_description").notNull(),
  rate: integer("rate").notNull(),
  guests: integer("guests").notNull(),
  beds: text("beds").notNull(),
  sizeSqft: integer("size_sqft").notNull(),
  imageUrl: text("image_url").notNull(),
  gallery: text("gallery", { mode: "json" }).$type<string[]>().notNull(),
  amenities: text("amenities", { mode: "json" }).$type<string[]>().notNull(),
  available: integer("available", { mode: "boolean" }).notNull().default(true),
});

export const reservations = sqliteTable("reservations", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  confirmationCode: text("confirmation_code").notNull().unique(),
  roomId: integer("room_id")
    .notNull()
    .references(() => rooms.id),
  guestName: text("guest_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  checkIn: text("check_in").notNull(),
  checkOut: text("check_out").notNull(),
  guests: integer("guests").notNull(),
  notes: text("notes").notNull().default(""),
  status: text("status").notNull().default("pending"),
  total: integer("total").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .$defaultFn(() => new Date())
    .notNull(),
});

export const inquiries = sqliteTable("inquiries", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email").notNull(),
  topic: text("topic").notNull(),
  message: text("message").notNull(),
  status: text("status").notNull().default("open"),
  createdAt: integer("created_at", { mode: "timestamp" })
    .$defaultFn(() => new Date())
    .notNull(),
});

export type Room = typeof rooms.$inferSelect;
export type Reservation = typeof reservations.$inferSelect;
export type Inquiry = typeof inquiries.$inferSelect;
