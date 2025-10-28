import fs from "fs/promises";
import { read } from "node:fs";
import net from "node:net";

const server = net.createServer();



server.on("connection", async (socket) => {
  console.log("New Connection has been arrived");

  const fileHandle = await fs.open("oneLakhNum.txt");
  const readStream = fileHandle.createReadStream({highWaterMark:20});
  const {size}=await fileHandle.stat()
  console.log(size)

  socket.write("http/1.1 200 OK\r\n");
  socket.write("Access-Control-Allow-Origin: *\r\n");
  socket.write("Access-Control-Expose-Header: *\r\n");
  socket.write(`Content-Length: ${size}\r\n`)
  socket.write("Content-Type: text/txt; charset=utf-8");
  // socket.write('Content-Disposition: attachment;filename=serverVideo.mp4\r\n')
  socket.write("\r\n\r\n");
  // readStream.pipe(socket);
  readStream.on('data',(chunk)=>{
    socket.write(chunk)
    readStream.pause()
    setTimeout(()=>{readStream.resume()},5000)

  })

  // socket.on('drain',()=>{
  //   readStream.resume()
  // })
  // socket.end("This is http server with tcp")


    readStream.on('error',async()=>{
        console.log('Readfile error')
        await fileHandle.close()
        socket.destroy()
    })
    socket.on('error',async()=>{
        console.log('Socket error')
        await fileHandle.close()
        socket.destroy()
    })
    
    readStream.on('end',async()=>{
        console.log("File Sent Successfully")
        await fileHandle.close()
        socket.end()
    })
});

server.listen(4000, "0.0.0.0", () => {
  console.log("Server has been started...");
});
