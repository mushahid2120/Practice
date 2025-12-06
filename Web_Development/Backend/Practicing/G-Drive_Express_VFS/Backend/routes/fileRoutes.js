import fs, { readFile, rm, rmdir } from "fs/promises";
import express from "express";
import path from 'path'
import { createWriteStream, write} from "fs";
import {writeFile} from "fs/promises"
import filesList from "../filesDB.json" with {type: 'json'}
import directoryList from "../directoryDB.json" with {type: 'json'}
import validateId from "../middleware/validateId.js";

const router=express.Router()
router.param("id",validateId);
router.param("parentDirId",validateId);

//Read File
router.get("/:id", (req, res) => {
  const id =req.params?.id;
  const fileData=filesList.find((file)=>file.id===id);
  const parentDirData=directoryList.find((dir)=>dir.id===fileData.parentDirId);
  if(parentDirData.userId!==req.user.id) return res.status(401).json({error: "You don't hav access"});
  if(!fileData) {return res.status(404).send('File Not Found')}
  if(req.query.action==='download')
    return res.download(`${process.cwd()}/GDrive/${id}${fileData.extension}`,fileData.name)
    // res.set('Content-Disposition',`attachment;filename=${fileData.name}`)
  return res.status(200).sendFile(`${process.cwd()}/GDrive/${id}${fileData.extension}`)
});


//Upload File
router.post("/{:parentDirId}", async (req, res,next) => {
  const parentDirId=req.params.parentDirId || req.user.rootDirId
  const fileName=req.headers.filename
  const id=crypto.randomUUID()
  const extension=path.extname(fileName)
  const fileFullName=`${id}${extension}`
  const parentDirData=directoryList.find((dir)=>dir.id===parentDirId)
  if(parentDirData.userId!==req.user.id) return res.status(403).json({error: "You don't have permission to upload file directly"})
  
      filesList.push({id,extension,name: fileName,parentDirId})
      parentDirData.files.push(id)

  const writeStream=createWriteStream(`./GDrive/${fileFullName}`)
  req.pipe(writeStream)
  

        writeStream.on('finish', async () => {
          try {
            console.log('triggering... finish')
            await writeFile('./filesDB.json', JSON.stringify(filesList));
            await writeFile('./directoryDB.json', JSON.stringify(directoryList));
            res.json({ message: "File Uploaded Successfully" });
          } catch (err) {
            console.log(err)
            next(err);
          }
        }); 
});



//Rename File
router.patch("/:id", async (req, res) => {
  const id=req.params.id
  const newFileName=req.body?.newfilename 
  console.log(newFileName)
  const fileData=filesList.find((file)=>(file.id===id))
  if(!fileData) return res.status(405).json({error: 'File not Found'})
  const parentDirData=directoryList.find((dir)=>dir.id===fileData.parentDirId)
  if(!parentDirData) return res.status(404).json({error: "parent Directory is not found"})
  else if(parentDirData.userId!==req.user.id) return res.status(403).json({error: "You don't have access to rename this file"})
  if(newFileName) fileData.name=newFileName
  try {
    await writeFile('./filesDB.json',JSON.stringify(filesList))
  return res.json({message: "File Renamed Successfully"})
  } catch (error) {
    next(error)
  }
});

//Delete File
router.delete("/:id", async (req, res) => {
  const id=req.params?.id
  const fileDataIndex=filesList.findIndex((file)=>(file.id===id))
  if(fileDataIndex===-1) return res.status(404).json({error: "Deleting File not Found"})
  const fileData=filesList[fileDataIndex]
  const parentDirData=directoryList.find((dir)=>dir.id===fileData.parentDirId)
  if(!parentDirData) return res.status(404).json({error: "parent Directory is not found"})
  else if(parentDirData.userId!==req.user.id) return res.status(403).json({error: "You don't have access to delete this file"})
  const parentDirDataIndex=parentDirData.files.findIndex((fileId)=>fileId===id)

  filesList.splice(fileDataIndex,1)
  parentDirData.files.splice(parentDirDataIndex,1)

  try {
    await rm(`./GDrive/${id}${fileData.extension}`)
  await writeFile('./filesDB.json',JSON.stringify(filesList))
  await writeFile('./directoryDB.json',JSON.stringify(directoryList))
  return res.json({ message: "File Deleted" });
  } catch (error) {
    next(error)
  }
});

export default router