import { sqlite } from "./src/db";
import app from "./src";
import { updateDB } from "./src/lib";

sqlite.exec(
  `
        CREATE TABLE IF NOT EXISTS photos(
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          albumId INTEGER NOT NULL,
          title TEXT NOT NULL,
          url TEXT NOT NULL,
          thumbnailUrl TEXT NOT NULL
        )
    `
);

updateDB();

export default app;
