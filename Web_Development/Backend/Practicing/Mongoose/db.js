import mongoose, { Schema } from "mongoose";
await mongoose.connect("mongodb://admin:admin@localhost:27017");

// const pluralizer=mongoose.pluralize();
// mongoose.set("autoCreate",false);

// mongoose.pluralize((word)=>word.toLocaleLowerCase())

const schema = new Schema({
  name: {
    type: String,
    required: [true, "name field is required"],
    minLength: [2, "name should be atleast 2 character "],
    alias: 'naam',
    index: true
  },
  age: {
    type: Number,
    required: [true, "age field is required"],
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true
  },
  password:{
    type: String,
    lowercase: true,
    trim: true
  },
  hobbies: {
    type: [String],
  },
  balance: Number,
  parentId: {
    type: Schema.Types.ObjectId,
    required: function () {
      return this.age < 18;
    },
    default: null,
    ref: "mMyColl"
  }},{
    strict: 'throw',
    timestamps: true,
    versionKey: "--version",
    optimisticConcurrency: true,
    virtuals:{
      hobbiesString: {
        get(){return this.hobbies.join(', ')},
        set(value){return this.hobbies=[...this.hobbies,...value.split(', ')]}
      }
    },
    methods:{
      getSummary(option){
        if(option==='full')
          return `${this.name} is ${this.age} years old and he has these hobbies ${this.hobbies.join(', ')}`
         return `${this.name} is ${this.age} years old`
      }
    },
    statics:{
      findOneByName(name){
        return this.findOne({name})
      }
    }
}
);

// schema.pre("save",function(){
//   console.log("before crating something")
//   this.password=this.name+this.age;
// })

// schema.post("save",function(doc){
//   console.log("after creating ")
//   doc.firstname=doc.name.split(' ')[0]
//   console.log(doc)
// })

// schema.pre(['findOne','find'],function(){
//   this.find({age: {$lte:29}})
// })

const User = mongoose.model("mMyColl", schema);


export default User;
