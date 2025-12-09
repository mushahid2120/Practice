import {MongoClient}  from 'mongodb'

const client= new MongoClient('mongodb://127.0.0.1:27017')

await client.connect()

const db=client.db('user')
const collection=db.collection('employ')

// CREATE 
// const sCollection=db.collection('student')
const tCollection=db.collection('teacher')

// await sCollection.insertOne({name: "Aman",age:20})
// await tCollection.insertMany([{name:'Md',age:40},{name: "mushahid",age:30}])



//READ
// const employData=await collection.find({salary: 72000}).toArray()
// console.log(employData)


//show all Collection
// const collectionList=await db.listCollections().toArray()

//show all Databases
// const admin=client.db().admin()
// console.log(await admin.listDatabases())


// UPDATE 
// await tCollection.updateOne({name: "mushahid"},{$set:{gender: 'Male'}})

//DELETE
// await tCollection.deleteOne({name: "Md"})
// await tCollection.drop()



const mydb=client.db("mydb")
await mydb.dropDatabase()

client.close()
