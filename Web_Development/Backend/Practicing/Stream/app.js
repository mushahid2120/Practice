import fs from "fs"
import { Writable } from "stream"
// console.time()
// const reading=fs.readFileSync('../Testing.mp4')
// fs.writeFileSync("video.mp4",reading)

// console.timeEnd()


const readStream=fs.createReadStream("text.txt",{highWaterMark: 4})
const writeStream=fs.createWriteStream('text1.txt')

readStream.pipe(writeStream)


writeStream.on('close',()=>{
writeStream.end()
    console.log("Closing")
})
writeStream.on('end',()=>{
    console.log("Ending")
})
writeStream.on('finish',()=>{
    console.log("finish")
})


// console.log(readStream.readableFlowing)
// console.log(readStream.isPaused())

// readStream.pipe(writeStream)


// readStream.on("data",(chunk)=>{
//     const isEmpty=writeStream.write(chunk)
    
//     console.log(isEmpty)
//     console.log(writeStream.isEmpty)
//     if(!isEmpty)
//         readStream.pause()
//     // console.log(chunk)
//     // console.log(readStream.readableFlowing)
//     // readStream.pause()
// })


// writeStream.on('drain',()=>{
//     readStream.resume()
// })

// readStream.distroy()

// readStream.on('readable',()=>{
//     // console.log(readStream.read())
//     readStream.read(10)
//     console.log(readStream.readableLength)
// })

// readStream.on('pause',()=>{
//     // console.log("paused")
//     // console.log(readStream.isPaused())
//     // readStream.resume()
// })

// console.log(readStream.readableFlowing)





// readStream.on('end',()=>{
//     console.timeEnd()
//     console.log('Ending.......')
//     // console.log(readStream.readableEnded)
//     // console.log(readStream.readableFlowing)
//     // console.log(readStream.isPaused())
// })
// console.log(readStream.readableFlowing)

