import { Handler } from "express";
import { RateLimiterMemory } from "rate-limiter-flexible";
import zod, { ZodObject, ZodRawShape } from "zod";
import { FunctionHandler } from "./types";
import db, { PhotosDB, photos } from "./db";

export const rateLimiterMiddleware: Handler = (req, res, next) =>
  new RateLimiterMemory({
    keyPrefix: "middleware",
    points: 10,
    duration: 1,
  })
    .consume(req.ip || 0)
    .then(() => {
      next();
    })
    .catch(() => {
      res.status(429).send("Too Many Requests");
    });

export const zodValidPhoto = zod.object({
  id: zod.number(),
  albumId: zod.number(),
  title: zod.string(),
  url: zod.string(),
  thumbnailUrl: zod.string(),
});

export const zodQeury = zod.object({
  max: zod.string(),
  min: zod.string(),
});

export const zodRemove = zod.object({
  id: zod.number(),
});

export const validatePrms = <T extends ZodRawShape, I>(args: {
  zod: ZodObject<T>;
  input: I;
}) =>
  args.zod
    .parseAsync(args.input)
    .then(() => args.input)
    .catch((err) => null);

export const functionHandler: FunctionHandler = async (args) => {
  const parameter = await validatePrms({
    zod: args.zod,
    input: args.parameter,
  });

  if (!parameter) return { status: 403, json: { error: "unvalid" } };

  return args.function(parameter as any);
};

export const updateDB = async () => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 5000);

  await db.delete(photos);

  return await fetch("https://jsonplaceholder.typicode.com/photos", {
    method: "GET",
    signal: controller.signal,
  })
    .then((res) => res.json())
    .then((result: PhotosDB[]) =>
      db
        .insert(photos)
        .values(result)
        .returning({ insertedId: photos.id })
        .then((e) => e)
        .catch(() => undefined)
    )
    .catch(() => undefined);
};
