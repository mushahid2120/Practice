import fs, { rm } from "fs/promises";
import express from "express";
import path from 'path'
import filesList from "../filesDB.json" with {type: 'json'}
import directoryList from "../directoryDB.json" with {type: 'json'}
import { writeFile } from "fs/promises";

const router=express.Router()

router.get("/{:id}", async (req, res) => {
  const id=req.params?.id || directoryList[0].id
  const directoryData=id ? (directoryList.find((dir)=>dir.id===id)) : directoryList[0]
  const filesData=directoryData.files.map((fileId)=>filesList.find((file)=>file.id===fileId))
  const directoriesData=directoryData.directories.map((dirId)=>directoryList.find((dir)=>dir.id===dirId))
  console.log(filesList.length,directoryList.length)
  res.json({...directoryData,files:filesData,directories:directoriesData})
});

router.post ('/{:parentDirId}',async(req,res)=>{
  const parentDirId=req.params.parentDirId==='undefined' || req.params.parentDirId===undefined ?
  (directoryList[0].id):(req.params.parentDirId);
  
  const foldername=req.body.foldername
  const id=crypto.randomUUID()
  console.log(typeof req.params.parentDirId,directoryList[0].id)

  const directoryData=directoryList.find((dir)=>dir.id===parentDirId)
  directoryData.directories.push(id)

  directoryList.push({
        id,
        "name": foldername,
        "files": [],
        "directories": [],
        parentDirId
    })
    
  await writeFile('./directoryDB.json',JSON.stringify(directoryList))
  res.json({message: "Folder Created"})
})

router.patch('/:folderId',async(req,res)=>{
  const folderId=req.params.folderId
  const newFolderName=req.body.newfoldername
  const dirData=directoryList.find((dir)=>folderId===dir.id)
  dirData.name=newFolderName
  await writeFile('./directoryDB.json',JSON.stringify(directoryList))
  res.json({message: "Folder Renamed Succussfully "})
})

router.delete('/:folderId',async(req,res)=>{
  const folderId=req.params.folderId
  const result=deleteAllDir([folderId])
  const folderParentId=directoryList.find((dir)=>dir.id===folderId).parentDirId
  const folderParentIndex=directoryList.findIndex((dir)=>dir.id===folderParentId)
  directoryList[folderParentIndex].directories=directoryList[folderParentIndex].directories.filter((dirId)=>dirId!==folderId)

  const resultFilesList=filesList.filter((file,index)=>!result.deleteFileIndex.includes(index))
  const resultDirList=directoryList.filter((dir,index)=>!result.deletedDirIndex.includes(index))
    
  for await (const fileIndex of result.deleteFileIndex){
    const fileData=filesList[fileIndex]
    await rm(`./GDrive/${fileData.id}${fileData.extension}`)
  }

  await writeFile('./filesDB.json',JSON.stringify(resultFilesList))
  await writeFile('./directoryDB.json',JSON.stringify(resultDirList))

  // res.json({resultDirList})
  res.json({message: "Folder Deleted Successfully"})
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
  // console.log(deletedDirIndex)
  return {deletedDirIndex,deleteFileIndex}
}



 function deleteAllFiles(fileIdList) {
  const  deleteFileIndex=[]
  const newFileDB=filesList.filter((file,index)=>{
    const result = fileIdList.find((fileId)=>fileId===file.id)
    if(result){
      // console.log(result)
      deleteFileIndex.push(index)
      return false
    }
    return true
  })

  // for await(const index of deleteFileIndex){
  //   const file=filesList[index]
  //   console.log(file)
  //   // await rm(`./GDrive/${file.id}${file.extension}`)
  // }
  // console.log({deleteFileIndex})
  // console.log(newFileDB)
  return deleteFileIndex
  // await writeFile('./filesDB.json',JSON.stringify(newFileDB))
}


export default router 