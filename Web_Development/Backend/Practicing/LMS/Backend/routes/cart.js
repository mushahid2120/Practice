import express from "express";
import Cart from "../models/Cart.js";
import User from "../models/User.js";
import Session from "../models/Session.js";

const router = express.Router();

// GET cart
router.get("/", async (req, res, next) => {
  try {
    const sid=req.session._id;
    const session = await Session.findById(sid)
      .populate([
        {
          path: "cartId",
          populate: { path: "data.courseId", select: "_id name price image" },
        },
        { path: "data.courseId", select: "_id name price image" },
      ])
      .select("data cartId")
      .lean();

    if (!session.cartId) {
      const data = session.data.map((d) => ({
        ...d.courseId,
        quantity: d.quantity,
      }));
      return res.status(200).json(data);
    }
    const data=session.cartId.data.map((d)=>({...d.courseId,quantity:d.quantity}))
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    // next(error);
  }
});

// Add to cart
router.post("/:courseId", async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const session=req.session

    if (!session.cartId) {
      const res = await Session.updateOne(
        { _id: session._id },
        { $push: { data: { courseId, quantity: 1 } } }
      );
      console.log(res);
    } else {
      const res = await Cart.updateOne(
        { _id: session.cartId },
        { $push: { data: { courseId, quantity: 1 } } }
      );
      console.log(res);
    }
    return res
      .status(201)
      .json({ message: "Cart has been added successfully" });
  } catch (error) {
    console.log(error);
    // next(error)
  }
});

// Update course from cart
router.patch("/:courseId", async (req, res) => {
  try {
    const session=req.session;
    const courseId = req.params.courseId;

    if (!session.cartId) {
      const result = await Session.updateOne(
        { _id: session._id, "data.courseId": courseId },
        { $inc: { "data.$.quantity": 1 } }
      );
    } else {
      const result = await Cart.updateOne(
        { _id: session.cartId, "data.courseId": courseId },
        { $inc: { "data.$.quantity": 1 } }
      );
      console.log(result)
    }
    return res
      .status(201)
      .json({ message: "cart quantity has been increases" });
  } catch (error) {
    console.log(error);
  }
});

// Delete cart
router.delete("/:courseId", async (req, res) => {
  try {
    const { courseId } = req.params;
    const session=req.session
    if(!session.cartId){
      const res=await Session.updateOne(
        { _id: session._id,},
        { $pull: { data:{courseId}} }
      );
    }
    else{
        const res=await Cart.updateOne(
        { _id: session.cartId,},
        { $pull: { data:{courseId}} }
      );
    }
    return res.status(201).json({message: "Delete Succussfully"})
  } catch (error) {
    console.log(error)
  }
});


export default router;
