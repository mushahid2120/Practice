import fs, { rm } from "fs/promises";
import express from "express";
import path from 'path'
import filesList from "../filesDB.json" with {type: 'json'}
import directoryList from "../directoryDB.json" with {type: 'json'}
import { writeFile } from "fs/promises";
import { error } from "console";

const router=express.Router()

//Read Direactory
router.get("/{:id}", async (req, res) => {
  const id=req.params?.id || directoryList[0].id
  const directoryData=id ? (directoryList.find((dir)=>dir.id===id)) : directoryList[0]
  const filesData=directoryData.files.map((fileId)=>filesList.find((file)=>file.id===fileId))
  const directoriesData=directoryData.directories.map((dirId)=>directoryList.find((dir)=>dir.id===dirId))
  console.log(filesList.length,directoryList.length)
  res.json({...directoryData,files:filesData,directories:directoriesData})
});


//Create Directory
router.post ('/{:parentDirId}',async(req,res)=>{
  const parentDirId=req.params.parentDirId==='undefined' || req.params.parentDirId===undefined ?
  (directoryList[0].id):(req.params.parentDirId);
  
  const foldername=req.body?.foldername || 'untitle'
  const id=crypto.randomUUID()

  const directoryData=directoryList.find((dir)=>dir.id===parentDirId)
  directoryData.directories.push(id)

  directoryList.push({
        id,
        "name": foldername,
        "files": [],
        "directories": [],
        parentDirId
    })
    
  try {
    await writeFile('./directoryDB.json',JSON.stringify(directoryList))
  return res.json({message: "Folder Created"})
  } catch (error) {
    next(error)
  }
})


//Rename Directory
router.patch('/:folderId',async(req,res)=>{
  const folderId=req.params?.folderId
  const newFolderName=req.body?.newfoldername
  const dirData=directoryList.find((dir)=>folderId===dir.id)
  if(!dirData) return res.status(404).json({error: 'Folder not found'})
  if(newFolderName) dirData.name=newFolderName
  try {
    await writeFile('./directoryDB.json',JSON.stringify(directoryList))
    return res.json({message: "Folder Renamed Succussfully "})
  } catch (error) {
    next(error)
  }
})


//Delete Directory
router.delete('/:folderId',async(req,res)=>{
  const folderId=req.params.folderId
  const folderParentId=directoryList.find((dir)=>dir.id===folderId).parentDirId
  if(!folderParentId) return res.status(404).json({error: 'No Such Directory'})
  const folderParentIndex=directoryList.findIndex((dir)=>dir.id===folderParentId)
  directoryList[folderParentIndex].directories=directoryList[folderParentIndex].directories.filter((dirId)=>dirId!==folderId)
  const result=deleteAllDir([folderId])

  const resultFilesList=filesList.filter((file,index)=>!result.deleteFileIndex.includes(index))
  const resultDirList=directoryList.filter((dir,index)=>!result.deletedDirIndex.includes(index))
    
  for await (const fileIndex of result.deleteFileIndex){
    try {
      const fileData=filesList[fileIndex]
    await rm(`./GDrive/${fileData.id}${fileData.extension}`)
    } catch (error) {
      res.status(500).json({error: `${fileData.name} Cannot Delete`})
    }
  }

  try{
    await writeFile('./filesDB.json',JSON.stringify(resultFilesList))
  await writeFile('./directoryDB.json',JSON.stringify(resultDirList))

  res.json({message: "Folder Deleted Successfully"})
  }catch(error){
    next(error)
  }
})

 function deleteAllDir(dirIdList) {
  let deletedDirIndex=[]
  let deleteFileIndex=[]
  if(dirIdList.length===0){
    return {deletedDirIndex,deleteFileIndex}
  }

  let newDirectoryList=directoryList.filter((dir,index)=>{
    const result = dirIdList.find((dirId)=>dirId===dir.id)
    if(result){
      deletedDirIndex.push(index)
      const returnValue=deleteAllDir(dir.directories)
      deletedDirIndex=deletedDirIndex.concat(returnValue.deletedDirIndex)
      deleteFileIndex=deleteFileIndex.concat(returnValue.deleteFileIndex)
      if(dir.files.length!==0) {
        deleteFileIndex=deleteFileIndex.concat(deleteAllFiles(dir.files))
        dir.files=[]
      }
      dir.directories=[]
      return false
    }
    return true
  })
  return {deletedDirIndex,deleteFileIndex}
}

 function deleteAllFiles(fileIdList) {
  const  deleteFileIndex=[]
  const newFileDB=filesList.filter((file,index)=>{
    const result = fileIdList.find((fileId)=>fileId===file.id)
    if(result){
      deleteFileIndex.push(index)
      return false
    }
    return true
  })
  return deleteFileIndex
}


export default router 