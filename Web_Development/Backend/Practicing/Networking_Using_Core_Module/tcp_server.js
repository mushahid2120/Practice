import net from 'node:net'
import fs from 'fs/promises'

// const fileHandle=await fs.open('clientEngine.jpg')
// const readStream=fileHandle.createReadStream({highWaterMark:1000})

const server=net.createServer()
server.listen(4000,'0.0.0.0',()=>{
    console.log("Server has been startd on the port 4000")
})

const usersSocket=[]

server.on('connection',(socket)=>{

        console.log("New Connection has been connected ",socket.remoteAddress,socket.remotePort)
        usersSocket.push(socket)
        console.log(usersSocket.length)

    socket.on('data',(chunk)=>{
        console.log(chunk.toString())
        // socket.write('Message has been received!!!!')
        usersSocket.map((userSocket)=>{
            if(userSocket!==socket)
                userSocket.write(chunk)
        })

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



