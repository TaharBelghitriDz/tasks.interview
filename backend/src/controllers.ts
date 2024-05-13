import { eq } from "drizzle-orm";
import db, { PhotosDB, photos } from "./db";
import { Controller } from "./types";

export const read: Controller<
  { min: string; max: string } & Record<string, string>
> = (args) =>
  db
    .select()
    .from(photos)
    .offset(parseInt(args.min))
    .limit(parseInt(args.max))
    .then((photos) => ({
      status: 200,
      json: { photos },
    }))
    .catch((err) => ({ status: 500, json: { error: err.message } }));

export const remove: Controller<{ id: number }> = ({ id }) =>
  db
    .delete(photos)
    .where(eq(photos.id, id))
    .then(() => ({ status: 200, json: { removed: true } }))
    .catch((err) => ({ status: 500, json: { error: err.message } }));

export const update: Controller<PhotosDB> = (photo) =>
  db
    .update(photos)
    .set(photo)
    .where(eq(photos.id, photo.id))
    .then(() => ({ status: 200, json: { updated: true } }))
    .catch((err) => ({ status: 500, json: { error: err.message } }));

export const insert: Controller<PhotosDB> = (photo) =>
  db
    .insert(photos)
    .values(photo)
    .onConflictDoNothing()
    .then(() => ({ status: 200, json: { inserted: true } }))
    .catch((err) => ({
      status: 500,
      json: { error: err.message },
    }));

export const dbLimit: Controller<undefined> = () =>
  db
    .select()
    .from(photos)
    .then((e) => ({ status: 200, json: { max: e.length } }))
    .catch((err) => ({
      status: 500,
      json: { error: err.message },
    }));
