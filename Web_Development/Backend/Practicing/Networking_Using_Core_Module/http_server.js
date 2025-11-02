import fs from "fs/promises"
import http from "node:http"
const server=http.createServer();
server.listen(4000,"0.0.0.0",()=>{
    console.log("Http server is ready")
})

server.on('request',async(request,response)=>{
    const fileHandle=await fs.open('cleintVideo.mp4')
    const readStream=fileHandle.createReadStream()
    const {size}=await fileHandle.stat()


    console.log("Connection Established",size)
    request.on('data',(chunk)=>{
        console.log(chunk.toString())
    })

    response.setHeader('Content-Type','video/mp4')
    response.setHeader('Content-Length',size.toString())
    readStream.pipe(response)
    // response.write("Sending from HTTP server")
    readStream.on('end',()=>{
        fileHandle.close()
    })
})