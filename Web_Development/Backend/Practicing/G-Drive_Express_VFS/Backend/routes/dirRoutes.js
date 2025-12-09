import  { rm } from "fs/promises";
import express from "express";
import { ObjectId } from "mongodb";

const router=express.Router();

//Read Direactory
router.get("/{:id}", async (req, res) => {
  const id=req.params?.id || req.user.rootDirId;
  const userId=req.userId;

  const db=req.db;
  const directoryCollection=db.collection('directory')
  const filesCollection=db.collection('files')
  const directoryData=await directoryCollection.findOne({_id: new ObjectId(id),userId: userId})
  if(!directoryData) return res.status(404).json({error:"You don't have any access" }) ;

  const filesData=await filesCollection.find({parentDirId: id}).toArray()
  const directoriesData=await directoryCollection.find({parentDirId: id}).toArray()
  console.log(filesData.length,directoriesData.length);
  res.json({...directoryData,files:filesData,directories:directoriesData});
});


//Create Directory
router.post ('/{:parentDirId}',async(req,res)=>{
  const parentDirId=req.params.parentDirId==='undefined' || req.params.parentDirId===undefined ?
  (req.user.rootDirId):(req.params.parentDirId);
  
  const foldername=req.body?.foldername || 'untitle'
  const db=req.db;
    const directoryCollection=db.collection('directory')
  try {
  // const directoryData=await directoryCollection.findOne({_id : new ObjectId(parentDirId),userId: req.userId})
  // if(!directoryData) return res.status(404).json({error: 'You are not authorized to create this directory'})
  await directoryCollection.insertOne({
        userId: req.userId,
        "name": foldername,
        parentDirId
    })
  return res.json({message: "Folder Created"})
  } catch (error) {
    next(error)
  }
})


//Rename Directory
router.patch('/:folderId',async(req,res)=>{
  const folderId=req.params?.folderId
  const db=req.db;
  const dirCollection=db.collection('directory')
  const newFolderName=req.body?.newfoldername
  try {
  // const dirData=await dirCollection.findOne({_id: new ObjectId(folderId),userId: req.userId})
  // if(!dirData) return res.status(404).json({error: 'Folder not found or You are not authorized to rename this folder'})
  if(newFolderName) 
    await dirCollection.updateOne({_id: new ObjectId(folderId),userId: req.userId},{$set:{name:newFolderName}})
    return res.json({message: "Folder Renamed Succussfully "})
  } catch (error) {
    next(error)
  }
})


//Delete Directory
router.delete('/:folderId',async(req,res,next)=>{
  const folderId=req.params.folderId
  const db=req.db;
  const dirCollection=db.collection('directory')
  const fileCollection=db.collection('files')
  try{
  const parentDirData=await dirCollection.findOne({_id: new ObjectId(folderId),userId: req.userId})
  if(!parentDirData) return res.status(404).json({error: 'No Such Directory or You are not authorized to delete this folder'})
  const result=await deleteAllDir(folderId,db)

  result.deletedDirIds=result.deletedDirIds.map((id)=>new ObjectId(id))
  const filesData=await fileCollection.find({_id: {$in: result.deletedFilesId}}).toArray()
  for await (const file of filesData){
    try {
      const fileName=file._id.toString()+file.extension
      console.log(fileName)
    await rm(`./GDrive/${fileName}`)
    } catch (error) {
      console.log(error)
      res.status(500).json({error: `${fileName} Cannot Delete`})
    }
  }
  await dirCollection.deleteMany({_id: {$in: result.deletedDirIds}})
  await fileCollection.deleteMany({_id: {$in: result.deletedFilesId}})

  res.json({message: "Folder Deleted Successfully"})
  }catch(error){
    next(error)
  }
})

 async function deleteAllDir(dirId,db) {

  let deletedDirIds=[];
  let deletedFilesId=[];
  const dirCollection=db.collection('directory');
  const fileCollection=db.collection('files');
  const dirList=await dirCollection.find({parentDirId: dirId}).toArray();
  const currentdir=await dirCollection.findOne({_id: new ObjectId(dirId)})
  deletedDirIds.push(dirId)
  const fileList=await fileCollection.find({parentDirId: dirId},{projection:{_id:1}}).toArray();
  if(fileList)
      deletedFilesId=deletedFilesId.concat(fileList.map(({_id})=>(_id)))
  if(dirList.length===0) return {deletedDirIds,deletedFilesId}

  for await (const dir of dirList){
    const returnValue=await deleteAllDir(dir._id.toString(),db)
    deletedDirIds=deletedDirIds.concat(returnValue.deletedDirIds)
    deletedFilesId=deletedFilesId.concat(returnValue.deletedFilesId)
    const fileList=await fileCollection.find({parentDirId: dir._id},{projection:{_id:1}}).toArray();
    if(fileList)
      deletedFilesId=deletedFilesId.concat(fileList.map(({_id})=>(_id)))
  }

  return {deletedDirIds,deletedFilesId}
}



export default router 