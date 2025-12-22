import jwt from "jsonwebtoken";
import { secretKey } from "../routes/auth.js";
import mongoose from "mongoose";
import User from "../models/User.js";
import Cart from "../models/Cart.js";
import Session from "../models/Session.js";

export const authenticateToken = async (req, res, next) => {
  const token = req.cookies?.token;
  try {
    if (!token)
      return res.status(401).json({ error: "You are not valid user" });

    const { sid } = jwt.verify(token, secretKey);


    if (!sid) {
      res.clearCookie("token");
      return res.status(401).json({ error: "You are not valid user" });
    }

    const session = await Session.findById(sid).select("_id cartId").lean();

    if (!session) {
      res.clearCookie("token");
      return res.status(401).json({ error: "Session Invalid" });
    }

    req.session = session;
    next();
  } catch (error) {
    console.log(error);
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};
