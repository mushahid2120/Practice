import mongoose from "mongoose";


//Here I am using for Guest Users
const sessionSchema = new mongoose.Schema({
    cartId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cart',
        default : null
    },
    data: {type: [
    {
      courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true
      },
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],
  },
  expire: {
    type: Number,
    required: true,
    default: Math.round(Date.now() / 1000 + 60 * 60),
  },
});

const Session = mongoose.model("session", sessionSchema);

export default Session;
