import net from 'node:net'
import fs from 'fs/promises'
import { createWriteStream } from 'node:fs'

// const fileHandle=await fs.open('clientEngine.jpg')
// const readStream=fileHandle.createReadStream({highWaterMark:1000})

const server=net.createServer()
server.listen(4000,'0.0.0.0',()=>{
    console.log("Server has been startd on the port 4000")
})

server.on('connection',(socket)=>{

        console.log("New Connection has been connected ",socket.remoteAddress,socket.remotePort)

        const writeStream=createWriteStream('serverVideo.mp4')
        socket.pipe(writeStream)

    socket.on('data',(chunk)=>{
        console.log(" many times")
        // console.log(chunk.toString())

        // socket.write('Message has been received!!!!')
        // usersSocket.map((userSocket)=>{
        //     if(userSocket!==socket)
        //         userSocket.write(chunk)
        // })

        // readStream.on('data',(chunkBuff)=>{
        //     socket.write(chunkBuff)
        // })
        // readStream.on('end',()=>{
        //     fileHandle.close()
        // })
        // socket.end()

    })

    socket.on('error',()=>{
        console.log("Client Lost")
    })
})



