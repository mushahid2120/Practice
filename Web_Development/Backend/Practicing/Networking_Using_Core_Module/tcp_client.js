import net from 'node:net'
const socket=net.createConnection({host:"192.168.43.198",port:4000})

socket.on('data',(chunk)=>{
    console.log(chunk.toString())
    // socket.end()
})
socket.write('Hi from tcp client')

socket.on('error',()=>{
    console.log("Server Lost")
})

import readline from 'readline'
process.stdin.on('data',(chunk)=>{
    // console.log(chunk.toString())
    readline.clearLine(process.stdout, 0);
    process.stdin.destroy()
})


