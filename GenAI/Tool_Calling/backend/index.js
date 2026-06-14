import express from "express";
import { generate, summarize } from "./chatdpt.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import NodeCache from "@cacheable/node-cache";
import crypto from "crypto";

const cache = new NodeCache();

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(cookieParser());

app.use((req, res, next) => {
  let userid = req.cookies.userid;
  if (!userid) {
    userid = crypto.randomUUID();
    res.cookie("userid", userid, {
      maxAge: 1000 * 60 * 60 * 12,
      httpOnly: true,
      secure: true,
      sameSite: "lax",
    });
  }
  req.userid = userid;
  const chathistory = cache.get(userid);
  // return res.json({genereatedText: "OK"})
  req.last_summary = chathistory!==undefined ?  chathistory : "No summary : This is the first message";
  next();
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/generate", async (req, res, next) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "prompt is required" });
    }

    const genereatedText = await generate({
      prompt,
      last_summary: req.last_summary,
    });
    const summary = await summarize(
      JSON.stringify({
        prompt,
        genereatedText,
        last_summary: req.last_summary,
      }),
    );

    cache.set(req.userid, summary);

    return res.json({ genereatedText });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
});

app.listen(4000, () => {
  console.log("Server is running on http://localhost:4000");
});
