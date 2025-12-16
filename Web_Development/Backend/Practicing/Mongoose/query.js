import mongoose from "mongoose"
import User from "./db.js"
// const query=User.find({name:"abdul"})

// query.select("name age -_id")
// console.log(query.getQuery())

// // console.log(await query)
// console.log(await query.exec())

const user=await User.findOne({name: "ansari"}).populate({
    path: "parentId",select: "name age hobbies -_id",populate: {path: "parentId",select:"name -_id age"}
})
console.log(user);
mongoose.disconnect();