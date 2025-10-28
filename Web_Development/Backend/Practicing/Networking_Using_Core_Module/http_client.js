import http from 'node:http'

const clientRequest=http.request({port:4000,method: 'POST'})

clientRequest.end('Welcome to http')

clientRequest.on('response',(response)=>{
    response.on('data',(chunk)=>{
        console.log(chunk.toString())
    })
})