import express from "express";
import cors from "cors";
import helmet from "helmet";
import { insert, read, remove, update } from "./controllers";
import {
  functionHandler,
  rateLimiterMiddleware,
  updateDB,
  zodQeury,
  zodRemove,
  zodValidPhoto,
} from "./lib";

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());
app.use(express.urlencoded({}));
app.set("trust proxy", true);
app.use(helmet());
app.use(rateLimiterMiddleware);

app.get("/", async (req, res) => {
  const handler = await functionHandler({
    function: read,
    zod: zodQeury,
    parameter: req.query as any,
  });

  return res.status(handler.status).json(handler.json);
});

app.post("/", async (req, res) => {
  const handler = await functionHandler({
    function: insert,
    zod: zodValidPhoto,
    parameter: req.body,
  });

  return res.status(handler.status).json(handler.json);
});

app.delete("/", async (req, res) => {
  const handler = await functionHandler({
    function: remove,
    zod: zodRemove,
    parameter: req.body,
  });

  return res.status(handler.status).json(handler.json);
});

app.put("/", async (req, res) => {
  const handler = await functionHandler({
    function: update,
    zod: zodValidPhoto,
    parameter: req.body,
  });

  return res.status(handler.status).json(handler.json);
});

app.get("/update", (_, res) =>
  updateDB().then((e) => res.status(e ? 200 : 400).json({ valid: !!e }))
);

app.use((_, res) => res.status(404).send("<h1>Page not found 404</h1>"));

app.listen(8080, () => {
  console.log("Port 8080");
});

export default app;
