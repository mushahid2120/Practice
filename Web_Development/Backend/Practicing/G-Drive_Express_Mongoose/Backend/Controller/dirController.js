import { rm } from "fs/promises";
import { ObjectId } from "mongodb";
import Dir from "../Model/dirModel.js";
import Files from "../Model/fileModel.js";


//Get Directory Items
export const getAllDir = async (req, res) => {
  const id = req.params?.id || req.user.rootDirId;
  const userId = req.user._id;

  const directoryData = await Dir.findOne({
    _id: new ObjectId(id),
    userId: userId,
  }).lean();
  if (!directoryData)
    return res.status(404).json({ error: "You don't have any access" });

  const filesData = await Files
    .find({ parentDirId: id }).lean();
  const directoriesData = await Dir
    .find({ parentDirId: id }).lean();
  res.json({
    ...directoryData,
    files: filesData,
    directories: directoriesData,
  });
};


//Create Directory
export const createDir = async (req, res,next) => {
  const parentDirId =
    req.params.parentDirId === "undefined" ||
    req.params.parentDirId === undefined
      ? req.user.rootDirId
      : req.params.parentDirId;

  const foldername = req.body?.foldername || "untitle";
  try {
    // const directoryData=await directoryCollection.findOne({_id : new ObjectId(parentDirId),userId: req.userId})
    // if(!directoryData) return res.status(404).json({error: 'You are not authorized to create this directory'})
    const result=await Dir.insertOne({
      userId: req.user._id,
      name: foldername,
      parentDirId
    });
    return res.json({ message: "Folder Created" });
  } catch (error) {
    return res.json({error})
    next(error);
  }
};

export const renameDir = async (req, res) => {
  const folderId = req.params?.folderId;
  const newFolderName = req.body?.newfoldername;
  try {
    // const dirData=await dirCollection.findOne({_id: new ObjectId(folderId),userId: req.userId})
    // if(!dirData) return res.status(404).json({error: 'Folder not found or You are not authorized to rename this folder'})
    if (newFolderName)
      await Dir.updateOne(
        { _id: folderId, userId: req.user._id },
        { name: newFolderName}
      );
    return res.json({ message: "Folder Renamed Succussfully " });
  } catch (error) {
    next(error);
  }
};

export const deleteDir = async (req, res, next) => {
  const folderId = req.params.folderId;
  try {
    const parentDirData = await Dir.findOne({
      _id: folderId,
      userId: req.user._id,
    }).lean();

    if (!parentDirData)
      return res
        .status(404)
        .json({
          error:
            "No Such Directory or You are not authorized to delete this folder",
        });
    const result = await deleteAllDir(folderId);

    // result.deletedDirIds=result.deletedDirIds.map((id)=>new ObjectId(id))
    const filesData = await Files
      .find({ _id: { $in: result.deletedFilesId } })
      .lean();
    for await (const file of filesData) {
      try {
        const fileName = file._id.toString() + file.extension;
        await rm(`./GDrive/${fileName}`);
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: `${fileName} Cannot Delete` });
      }
    }
    await Dir.deleteMany({ _id: { $in: result.deletedDirIds } });
    await Files.deleteMany({ _id: { $in: result.deletedFilesId } });

    res.json({ message: "Folder Deleted Successfully" });
  } catch (error) {
    next(error);
  }
};

async function deleteAllDir(dirId) {
  let deletedDirIds = [];
  let deletedFilesId = [];
  const dirList = await Dir.find({ parentDirId: dirId }).lean();
  const currentdir = await Dir.findById(dirId);
  deletedDirIds.push(dirId);
  const fileList = await Files
    .find({ parentDirId: dirId }).select('_id').lean();
  if (fileList)
    deletedFilesId = deletedFilesId.concat(fileList.map(({ _id }) => _id));
  if (dirList.length === 0) return { deletedDirIds, deletedFilesId };

  for await (const dir of dirList) {
    const returnValue = await deleteAllDir(dir._id);
    deletedDirIds = deletedDirIds.concat(returnValue.deletedDirIds);
    deletedFilesId = deletedFilesId.concat(returnValue.deletedFilesId);
    const fileList = await Files
      .find({ parentDirId: dir._id }).select('_id')
      .lean();
    if (fileList)
      deletedFilesId = deletedFilesId.concat(fileList.map(({ _id }) => _id));
  }

  return { deletedDirIds, deletedFilesId };
}
