import mongoose from "mongoose";
import User from "./db.js";

// Create
// const result = await User.insertOne({
//   name: "khan",
//   age: 40,
//   email: "khan@md.com",
//   hobbies: ["cricket","Books","movies"],
// });

const result=await User.create({
  name: "ansari",
  age: 15,
  email: "ansari@md.com",
  hobbies: ["cricket","Books","movies","coding"],
  parentId: '6941755fb0995203e2360c6b'
})

// const user=new User({
//   name: "abdul",
//   age: 30,
//   email: "abdul@md.com",
//   hobbies: ["cricket","Books","movies"],
// })

// user.hobbies.push("Football")
// const result=await user.save();

// READ
// const result=await User.find({name: "abdul"}).lean()

//UPDATE
// const result=await User.findOneAndUpdate({name: "khan"},{age: 25},{new: true,runValidator: true})

//DELETE
// const result =await User.findOneAndDelete({name: "md"})
console.log(result);

mongoose.disconnect();