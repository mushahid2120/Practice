import { MongoClient, ObjectId } from "mongodb";
const client = new MongoClient("mongodb://127.0.0.1:27017");

await client.connect();

const db = client.db("test");
const collection = db.collection("mytest");
//   Ordered inserts
// const result = await collection.insertMany([
//     {name: "Ram"},
//     {name: "sam",_id:new ObjectId('693a89578124a581d70a8f4f')},
//     {name: "tom"},
//     {name: "bob"},
// ],{ordered: false})

//Upsert
// const result=await collection.updateOne({name: "pop"},{$set:{age:100}},{upsert: true})

//Command
// const result=await db.command({drop: "commands"})

//add validation modify collection
// const result = await db.command({
//   collMod: "mytest",
//   validator: {
//     name: {
//       $type: "string",
//     },
//     age: {
//       $type: "int",
//       $gte: 20,
//     },
//   },
//   validationAction: "warn",
// });

//add  validation while creating collection
// const result=await db.createCollection('newtest',{validator: {
//   name: {
//     $type: 'string'
//   },
//   age: {
//     $type: 'int',
//     $gte: 20
//   }
// }})
 
 //result 
// const result =await db.command({
//     create: "testcommand",
//     validator: {
//   name: {
//     $type: 'string'
//   },
//   age: {
//     $type: 'int',
//     $gte: 20
//   }
// }
// })


console.log(result);

client.close();
