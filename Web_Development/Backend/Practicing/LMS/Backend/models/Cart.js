import mongoose from "mongoose";

//Here we are mananging session for authenticated users
const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    // unique: true
  },
  data: {
    type: [
      {
        courseId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Course",
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    default: [],
  },
});

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;
