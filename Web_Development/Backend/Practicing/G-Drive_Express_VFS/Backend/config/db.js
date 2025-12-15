import {MongoClient} from  'mongodb'

export const client=new MongoClient('mongodb://storageApp:12345@127.0.0.1:27017/storageApp')

export default async function connectDB(){
    await client.connect()
    const db=client.db()
    console.log("Connected to Database")
    return db;
}

process.on('SIGINT',async()=>{
    await client.close()
    console.log("Client Disconnected")
    process.exit(0);
})