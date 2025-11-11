import fs from "fs/promises";
import express from "express";
import path from 'path'

const router=express.Router()

router.get("/", async (req, res) => {
  const fileList = await fs.readdir("./Storage");
  const resData = [];
  for (const item of fileList) {
    const stats = await fs.stat(`./Storage/${item}`);
    resData.push({ name: item, isDirectory: stats.isDirectory() });
  }
  // console.log(resData);
  res.json(resData);
});

router.get("/*splat", async (req, res) => {
  const dirname=path.join('/',req.params.splat.join('/'))
  console.log(dirname)

  const fileList = await fs.readdir(`./Storage/${dirname==='undefined' ? '':dirname}`);
    const resData = [];
  for (const item of fileList) {
    const stats = await fs.stat(`./Storage/${dirname==='undefined' ? '':dirname}/${item}`);
    resData.push({ name: item, isDirectory: stats.isDirectory() }); 
  }
  // console.log(resData);
  res.json(resData);
});

router.post ('/*splat',async(req,res)=>{
  const dirname=path.join('/',req.params.splat.join('/'))
  console.log(dirname)
  await fs.mkdir(`./Storage/${dirname}`)
  res.json({message: "Folder Created"})
})

export default router 