import {MongoClient} from "mongodb";

export const client=new MongoClient('mongodb://admin:admin@localhost:27017/todos?authSource=admin');

export default async function connectDB(){
    await client.connect();
    const db=client.db();
    console.log("Connected to Database")
    return db;
}

process.on('SIGINT',async()=>{
    await client.close()
    console.log("Client Disconnected")
    process.exit(0);
})