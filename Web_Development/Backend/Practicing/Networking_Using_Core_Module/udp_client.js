import dgram from "node:dgram";
import fs from "fs/promises";

const socket = dgram.createSocket("udp4");
socket.on("message", (message, { address, port }) => {
  console.log(message.toString(), address, port);
//   socket.close();
});

const fileHandle = await fs.open("clientEngine.jpg");
const readStream = fileHandle.createReadStream({ highWaterMark: 16 * 1024 });

readStream.on("data", (chunk) => {
  socket.send(chunk, 4000, "192.168.43.198");
});

readStream.on('end',()=>{
    socket.send("EOF", 4000, "192.168.43.198");
    socket.close()
    console.log("file send")
})

// console.log(socket)
