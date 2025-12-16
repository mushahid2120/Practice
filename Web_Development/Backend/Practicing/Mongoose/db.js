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
  },
  age: {
    type: Number,
    required: [true, "age field is required"],
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  hobbies: {
    type: [String],
  },
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
    versionKey: "__version"
}
);

const User = mongoose.model("mMyColl", schema);

export default User;
