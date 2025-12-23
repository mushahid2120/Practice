import express from "express";
import Course from "../models/Course.js";
import Session from "../models/Session.js";
import jwt from "jsonwebtoken";
import { secretKey } from "./auth.js";

const router = express.Router();

// GET all courses
router.get("/", async (req, res) => {
  try {
    const token = req.cookies?.token ;
    const sid = jwt.verify(token, secretKey, (error, user) => {
      if (error) return null;
      return user;
    })?.sid;
    const session = await Session.findById(sid);
    if (!session) {
      const session = await Session.insertOne({
        cartId: null,
      });

      const token = jwt.sign({ sid: session.id }, secretKey, {
        expiresIn: "24h",
      });
      const cookieConfig = {
        httpOnly: true,
      };
      res.cookie("token", token, cookieConfig);
    }
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

export default router;
