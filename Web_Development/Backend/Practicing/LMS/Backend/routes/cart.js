import express from "express";
import Cart from "../models/Cart.js";
import User from "../models/User.js";

const router = express.Router();

// GET cart
router.get("/", async (req, res,next) => {
  try {
    const cart=await req.cart.exec();
    console.log(cart)
    return res.status(200).json(cart.courses)
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// Add to cart
router.post("/:courseId", async (req, res) => {
  const { courseId } = req.params;
  const cart=req.cart;
  cart.courses.push({courseId,quantity: 1})
  const addData=await cart.save();
  return res.status(201).json({message: "Cart has been added successfully"})
});

// Update course from cart
router.patch("/:courseId", async (req, res) => {
  const {courseId}=req.params;
  const cart=req.cart;
  cart.courses=cart.courses.map((item)=>{
    if(item.courseId===courseId)
      item.quantity=item.quantity+1;
    return item;
  })
  const add=await cart.save()
  return res.status(201).json({message: "cart quantity has been increases"})
});

// Clear cart
router.delete("/:courseId", async (req, res) => {
    const {courseId}=req.params;
    const cart=req.cart;
    cart.courses=cart.courses.filter((item)=>(item.courseId!==courseId))
    await cart.save();
});

export default router;
