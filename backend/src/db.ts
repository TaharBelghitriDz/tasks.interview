import { BetterSQLite3Database, drizzle } from "drizzle-orm/better-sqlite3";
import { text, integer, sqliteTable } from "drizzle-orm/sqlite-core";
import Database from "better-sqlite3";

export const sqlite = new Database("sqlite.db");

const db: BetterSQLite3Database = drizzle(sqlite);

export const photos = sqliteTable("photos", {
  id: integer("id").unique().primaryKey(),
  albumId: integer("albumId").notNull(),
  title: text("title").notNull(),
  url: text("url").notNull(),
  thumbnailUrl: text("thumbnailUrl").notNull(),
});

export type PhotosDB = typeof photos.$inferSelect;
export type PhotosInsertDB = typeof photos.$inferInsert;

export default db;
