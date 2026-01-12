import { rm } from "fs/promises";
import path from "path";
import { createWriteStream } from "fs";
import { ObjectId } from "mongodb";
import Files from "../Model/fileModel.js";
import Dir from "../Model/dirModel.js";
import { purify } from "./dirController.js";
import mongoose from "mongoose";

export const getFile = async (req, res, next) => {
  const id = req.params?.id;
  try {
    const fileData = await Files.findOne({ _id: new ObjectId(id) }).lean();
    const parentDirData = await Dir.findOne({
      _id: fileData.parentDirId,
      userId: req.user._id,
    }).lean();
    if (!parentDirData)
      return res.status(401).json({ error: "You don't hav access" });
    if (!fileData) {
      return res.status(404).send("File Not Found");
    }
    if (req.query.action === "download")
      return res.download(
        `${process.cwd()}/GDrive/${id}${fileData.extension}`,
        fileData.name
      );
    // res.set('Content-Disposition',`attachment;filename=${fileData.name}`)
    return res
      .status(200)
      .sendFile(`${process.cwd()}/GDrive/${id}${fileData.extension}`);
  } catch (error) {
    next(error);
  }
};

export const uploadFile = async (req, res, next) => {
  const parentDirId = req.params.parentDirId || req.user.rootDirId.toString();
  const fileName = req.headers.filename;
  const cleanFileName = purify.sanitize(fileName);
  const extension = path.extname(fileName);

  try {
    const parentDirData = await Dir.findOne({
      _id: parentDirId,
    }).lean();

    if (!parentDirData.userId.equals(req.user._id)) {
      return res
        .status(403)
        .json({ error: "You don't have permission to upload file directly" });
    }

    const fileId = new mongoose.Types.ObjectId();
  
    const fileFullName = `${fileId.toString()}${extension}`;
    const writeStream = createWriteStream(`./GDrive/${fileFullName}`);

    req.pipe(writeStream);

    req.on("error", async (error) => {
      await rm(`./GDrive/${fileFullName}`);
      writeStream.destroy();
      req.destroy();
      return res.status(401).json({ error: "File Upload Cancelled" });
    });

    req.on("end", async () => {
      const fileCreated = await Files.insertOne({
        _id: fileId,
        extension,
        name: cleanFileName,
        parentDirId,
        userId: req.user._id,
      });
      res.json({ message: "File Uploaded Successfully" });
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const renameFile = async (req, res) => {
  const id = req.params.id;
  const newFileName = req.body?.newfilename;
  const cleanNewFileName = purify.sanitize(newFileName);
  try {
    const fileData = await Files.findById(id).lean();
    if (!fileData) return res.status(405).json({ error: "File not Found" });
    const parentDirData = await Dir.findById(fileData.parentDirId).lean();
    if (!parentDirData)
      return res.status(404).json({ error: "parent Directory is not found" });
    else if (!parentDirData.userId.equals(req.user._id))
      return res
        .status(403)
        .json({ error: "You don't have access to rename this file" });
    if (cleanNewFileName)
      await Files.updateOne({ _id: id }, { name: cleanNewFileName });
    return res.json({ message: "File Renamed Successfully" });
  } catch (error) {
    next(error);
  }
};

export const deleteFile = async (req, res, next) => {
  const id = req.params?.id;
  const db = req.db;
  try {
    const fileData = await Files.findById(id).lean();
    if (!fileData)
      return res.status(404).json({ error: "Deleting File not Found" });
    const parentDirData = await Dir.findById(fileData.parentDirId);
    if (!parentDirData)
      return res.status(404).json({ error: "parent Directory is not found" });
    else if (!parentDirData.userId.equals(req.user._id))
      return res
        .status(403)
        .json({ error: "You don't have access to delete this file" });
    await rm(`./GDrive/${id}${fileData.extension}`);
    await Files.findByIdAndDelete(id);
    return res.json({ message: "File Deleted" });
  } catch (error) {
    next(error);
  }
};
