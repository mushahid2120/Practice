import mongoose from "mongoose";
import User from "./db.js";

// const user=await User.findOne({email: 'khan@md.com'})
// const user=await User.findOneByName('khan')

// console.log(user.id)
// console.log(user._id)

// console.log(user.toJSON({virtuals: true}))
// console.log(User.schema.virtuals)
// user.hobbiesString='movies,hiking'
// console.log(user.hobbiesString)

// console.log(user.getSummary('half'))
// console.log(user)


// const user=await User.insertOne({
// name:"Akhi",
// age:26,
// email:"akhi@md.com",
// hobbies:["traveling","reading","Running"],
// balance: 1000,
// parentId: null
// })

const user1=await User.findOne({name: "Akhi"});
const user2=await User.findOne({name: "Akhi"});
// // const user=await User.findOneByName('abdul')

user1.balance+=300
await user1.save()
console.log(user1)

user2.balance+=400
await user2.save()
console.log(user2)


await mongoose.disconnect()