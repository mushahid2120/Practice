import  { rm } from "fs/promises";
import express from "express";
import path from 'path'
import { createWriteStream, write} from "fs";
import { ObjectId } from "mongodb";

const router=express.Router()
// router.param("id",validateId);
// router.param("parentDirId",validateId);

//Read File
router.get("/:id", async(req, res,next) => {
  const id =req.params?.id;
  const db=req.db;
  const filesCollection=db.collection('files')
  const dirCollection=db.collection('directory')
try {
    const fileData=await filesCollection.findOne({_id: new ObjectId(id)})
  const parentDirData=await dirCollection.findOne({_id:new ObjectId(fileData.parentDirId),userId:req.userId})
  if(!parentDirData) return res.status(401).json({error: "You don't hav access"});
  if(!fileData) {return res.status(404).send('File Not Found')}
  if(req.query.action==='download')
    return res.download(`${process.cwd()}/GDrive/${id}${fileData.extension}`,fileData.name)
    // res.set('Content-Disposition',`attachment;filename=${fileData.name}`)
  return res.status(200).sendFile(`${process.cwd()}/GDrive/${id}${fileData.extension}`)
} catch (error) {
  next(error)
}
});


//Upload File
router.post("/{:parentDirId}", async (req, res,next) => {
  const parentDirId=req.params.parentDirId || req.user.rootDirId
  const db=req.db;
  const dirCollection=db.collection('directory');
  const fileCollection=db.collection('files');
  const fileName=req.headers.filename
  const extension=path.extname(fileName)

          try {
  const parentDirData=await dirCollection.findOne({_id: new ObjectId(parentDirId)})
  if(parentDirData.userId!==req.userId) return res.status(403).json({error: "You don't have permission to upload file directly"})
  const fileCreated=await fileCollection.insertOne({extension,name: fileName,parentDirId})
  const fileFullName=`${fileCreated.insertedId.toString()}${extension}`

  const writeStream=createWriteStream(`./GDrive/${fileFullName}`)
  req.pipe(writeStream)
  
        writeStream.on('finish', async () => {
            console.log('triggering... finish')
            res.json({ message: "File Uploaded Successfully" });
        }); 
          } catch (err) {
            console.log(err)
            next(err);
          }
});



//Rename File
router.patch("/:id", async (req, res) => {
  const id=req.params.id
  const db=req.db;
  const fileCollection=db.collection('files');
  const dirCollection=db.collection('directory')
  const newFileName=req.body?.newfilename 
  try {
  const fileData=await fileCollection.findOne({_id: new ObjectId(id)})
  if(!fileData) return res.status(405).json({error: 'File not Found'})
  const parentDirData=await dirCollection.findOne({_id: new ObjectId(fileData.parentDirId)})
  if(!parentDirData) return res.status(404).json({error: "parent Directory is not found"})
  else if(parentDirData.userId!==req.userId) return res.status(403).json({error: "You don't have access to rename this file"})
  if(newFileName)
    await fileCollection.updateOne({_id: new ObjectId(id)},{$set: {name: newFileName}})
  return res.json({message: "File Renamed Successfully"})
  } catch (error) {
    next(error)
  }
});

//Delete File
router.delete("/:id", async (req, res) => {
  const id=req.params?.id
  const db=req.db;
  const fileCollection=db.collection('files')
  const dirCollection=db.collection('directory')
    try {
  const fileData=await fileCollection.findOne({_id: new ObjectId(id)})
  if(!fileData) return res.status(404).json({error: "Deleting File not Found"})
  const parentDirData=await dirCollection.findOne({_id: new ObjectId(fileData.parentDirId)})
  if(!parentDirData) return res.status(404).json({error: "parent Directory is not found"})
  else if(parentDirData.userId!==req.userId) return res.status(403).json({error: "You don't have access to delete this file"})
    await rm(`./GDrive/${id}${fileData.extension}`)
  await fileCollection.deleteOne({_id: new ObjectId(id)})
  return res.json({ message: "File Deleted" });
  } catch (error) {
    next(error)
  }
});

export default router