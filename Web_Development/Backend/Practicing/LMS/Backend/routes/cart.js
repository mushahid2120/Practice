import express from "express";
import Cart from "../models/Cart.js";
import User from "../models/User.js";
import Session from "../models/Session.js";

const router = express.Router();

// GET cart
router.get("/", async (req, res, next) => {
  try {
    const session = req.session;
    let cartData;
    if (!session.userId) {
      cartData = await Session.findOne({ userId: session.userId })
        .populate({
          path: "data.courseId",
          select: "_id name price image",
        })
        .select("data")
        .lean();
    }
    else{
    cartData = await Cart.findOne({userId: session.userId})
      .populate({ path: "data.courseId", select: "_id name price image" })
      .select("data")
      .lean();
    }

    const data = cartData.data.map((d) => ({
      ...d.courseId,
      quantity: d.quantity,
    }));
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
    const session = req.session;

    if (!session.userId) {
      await session.updateOne(
        // { _id: session._id },
        { $push: { data: { courseId, quantity: 1 } } }
      );
      // session.data.push({courseId})
      // session.markModified('data')
      // session.set('data',[...session.data,{courseId}])
      // await session.save()
    } else {
      await Cart.updateOne(
        { userId: session.userId },
        { $push: { data: { courseId, quantity: 1 } } }
      );
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
    const session = req.session;
    const courseId = req.params.courseId;

    if (!session.userId) {
      // const result = await Session.updateOne(
      //   { _id: session._id, "data.courseId": courseId },
      //   { $inc: { "data.$.quantity": 1 } }
      // );
      const result = await session.updateOne(
        { $inc: { "data.$[item].quantity": 1 } },
        { arrayFilters: [{ "item.courseId": courseId }] }
      );
    } else {
      const result = await Cart.updateOne(
        { userId: session.userId, "data.courseId": courseId },
        { $inc: { "data.$.quantity": 1 } }
      );
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
    const session = req.session;
   
    if (!session.userId) {
      await session.updateOne(
        { $pull: { data: { courseId } } }
      );
    } else {
      const result=await Cart.updateOne(
        { userId: session.userId },
        { $pull: { data: { courseId } } }
      );
    }
    return res.status(201).json({ message: "Delete Succussfully" });
  } catch (error) {
    console.log(error);
  }
});

export default router;
