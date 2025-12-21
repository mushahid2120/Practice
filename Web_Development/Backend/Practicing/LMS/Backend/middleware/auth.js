import jwt from "jsonwebtoken";
import { secretKey } from "../routes/auth.js";
import mongoose from "mongoose";
import User from "../models/User.js";
import Cart from "../models/Cart.js";

export const authenticateToken = async (req, res, next) => {
  const { token } = req.cookies;

  const cart=new Cart({})
  if (!token) {
    return res.status(401).json({ message: "Authentication required" });
  }

  try {
    const { userId } = jwt.verify(token, secretKey);
    
    const user = await User.findById(userId).select("_id").lean();
    if (user) {
      const cart = Cart.findOne({ guestId: userId });
      
      req.cart=cart;
    }
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};
