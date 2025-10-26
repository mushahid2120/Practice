// import fs from 'fs'
// const fd=fs.openSync('file.txt')


// fs.read(fd,(err,bytesRead,buffData)=>{
//     console.log(err,bytesRead)
//     console.log(buffData.toString())
// })


import { createReadStream } from "fs"
import fs from "fs/promises"
const fileHandle=await fs.open('file.txt','r')
const writeHandle=await fs.open("file1.txt",'w')
// const buff=await fileHandle.read()
// console.log(buff.buffer)
// // const {buffer,bytesRead}=await fileHandle.read({buffer:Buffer.alloc(10)})
// const {wBuff,wbuffLen}=await writeHandle.write(buff.buffer)


const readStream=fileHandle.createReadStream({encoding:"utf-8"})
const writeStream=writeHandle.createWriteStream()

// readStream.on('data',(chunk)=>{
//     writeStream.write(chunk)
// })

readStream.pipe(writeStream)
