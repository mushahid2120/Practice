import dgram from "node:dgram";
import fs from "fs/promises";

const socket = dgram.createSocket("udp4");
const fileHandle = await fs.open("serverEngine.jpg", "w");
const writeStream = fileHandle.createWriteStream({ highWaterMark: 16 * 1024 });

socket.on("message", async (message, { port, address }) => {
  console.log(port, address);
  if (message === "EOF") {
    console.log(message)
    writeStream.end();
    socket.send("Message has been Received Succssfully.....", port, address);
  }
  writeStream.write(message);
  // socket.close()
});

socket.bind({ port: 4000 }, () => {
  console.log("UDP server is running on ", socket.address());
});
