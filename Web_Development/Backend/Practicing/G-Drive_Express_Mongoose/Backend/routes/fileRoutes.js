import express from "express";
import validateId from "../middleware/validateIdMW.js";
import {
  deleteFile,
  getFile,
  renameFile,
  uploadFile,
} from "../Controller/fileController.js";

const router = express.Router();
router.param("id", validateId);
router.param("parentDirId", validateId);

//Read File
router.get("/:id", getFile);

//Upload File
router.post("/{:parentDirId}", uploadFile);

//Rename File
router.patch("/:id", renameFile);

//Delete File
router.delete("/:id", deleteFile);

export default router;
