import fs from "fs/promises";
import express from "express";
import { createWriteStream } from "fs";

const router=express.Router()

router.get("/*splat", (req, res) => {
  console.log(req.params)
  const filename=req.params.splat.join('/')
  console.log(filename)
  if (req.query.action === "download")
    res.set("Content-Disposition", "attachment");
  res.sendFile(`${import.meta.dirname}/Storage/${filename}`);
});

router.post("/*splat", async (req, res) => {
  console.log(req.params)
  const filename=req.params.splat.join('/')
  console.log(filename)
  const writeStream = createWriteStream(`./Storage/${filename}`);
  req.pipe(writeStream);
  req.on("end", () => {
    res.json({ message: "File Uploaded Successfully" });
  });
});

router.patch("/*splat", async (req, res) => {
  try {
    const filename=req.params.splat.join('/')
    // console.log(filename)
    // console.log("inside the patch route", req.body);
    await fs.rename(
      `./Storage/${filename}`,
      `./Storage/${req.body.newfilename}`
    );
    res.json({ message: "Renamed Successfully" });
  } catch (error) {
    res.send(error.message);
  }
});

router.delete("/*splat", async (req, res) => {
  const filename=req.params.splat.join('/')
  await fs.rm(`./Storage/${filename}`,{recursive: true});
  res.json({ message: "File Deleted" });
});

export default router