import fs, { readFile, rm, rmdir } from "fs/promises";
import express from "express";
import path from 'path'
import { createWriteStream, write} from "fs";
import {writeFile} from "fs/promises"
import filesList from "../filesDB.json" with {type: 'json'}
import directoryList from "../directoryDB.json" with {type: 'json'}

const router=express.Router()

//Read
router.get("/:id", (req, res) => {
  const id =req.params?.id
  const fileData=filesList.find((file)=>file.id===id)
  console.log(fileData)
  if(req.query.action==='download')
    res.set('Content-Disposition',`attachment;filename=${fileData.name}`)
  res.sendFile(`${process.cwd()}/GDrive/${id}${fileData.extension}`)
});


//Upload
router.post("/:parentDirId", async (req, res) => {
  const parentDirId=req.params.parentDirId || directoryList[0].id
  const fileName=req.headers.filename
  // res.send({Message: "File Uploaded Successfully"})
  const id=crypto.randomUUID()
  const extension=path.extname(fileName)
  const fileFullName=`${id}${extension}`
  const parentDirData=directoryList.find((dir)=>dir.id===parentDirId)
  
      filesList.push({id,extension,name: fileName,parentDirId})
      parentDirData.files.push(id)

  const writeStream=createWriteStream(`./GDrive/${fileFullName}`)
  req.pipe(writeStream)
  req.on('end',async()=>{
      await writeFile('./filesDB.json',JSON.stringify(filesList))
      await writeFile('./directoryDB.json',JSON.stringify(directoryList))
      res.send({Message: "File Uploaded Successfully"})
  })
});


//Rename
router.patch("/:id", async (req, res) => {
  const id=req.params.id
  const newFileName=req.body.newfilename
  console.log(newFileName)
  const fileData=filesList.find((file)=>(file.id===id))
  fileData.name=newFileName
  await writeFile('./filesDB.json',JSON.stringify(filesList))
  res.json({message: "File Renamed Successfully"})
});

router.delete("/:id", async (req, res) => {
  const {id}=req.params
  const fileDataIndex=filesList.findIndex((file)=>(file.id===id))
  const fileData=filesList[fileDataIndex]
  const parentDirData=directoryList.find((dir)=>dir.id===fileData.parentDirId)
  const parentDirDataIndex=parentDirData.files.findIndex((fileId)=>fileId===id)

  filesList.splice(fileDataIndex,1)
  parentDirData.files.splice(parentDirDataIndex,1)

  await rm(`./GDrive/${id}${fileData.extension}`)
  await writeFile('./filesDB.json',JSON.stringify(filesList))
  await writeFile('./directoryDB.json',JSON.stringify(directoryList))
  res.json({ message: "File Deleted" });
});

export default router