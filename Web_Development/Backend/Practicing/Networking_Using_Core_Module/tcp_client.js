import { createReadStream } from 'node:fs'
import net from 'node:net'
const socket=net.createConnection({host:"localhost",port:4000})

socket.on('data',(chunk)=>{
    console.log(chunk.toString())
    // socket.end()
})
const readStream=createReadStream('cleintVideo.mp4')
readStream.pipe(socket)

// socket.write('Hi from tcp client')

socket.on('error',()=>{
    console.log("Server Lost")
})

// import readline from 'readline'
// process.stdin.on('data',(chunk)=>{
//     // console.log(chunk.toString())
//     readline.clearLine(process.stdout, 0);
//     process.stdin.destroy()
// })


