import mongoose from 'mongoose';
await mongoose.connect('mongodb://admin:admin@localhost:27017/todos?authSource=admin');

// const pluralizer=mongoose.pluralize();
// mongoose.set("autoCreate",false);

mongoose.pluralize((word)=>word.toLocaleLowerCase())

const userModel=mongoose.model("mMyColl",{name: String,age:Number});
const result=await userModel.insertOne({name: "mushahid",age: 23})
console.log(userModel)
// const data=await userModel.find()
// console.log(data)

mongoose.disconnect();