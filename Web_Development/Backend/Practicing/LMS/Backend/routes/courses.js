import express from "express";
import Course from "../models/Course.js";
import Session from "../models/Session.js";
import jwt from "jsonwebtoken";
import { secretKey } from "./auth.js";

const router = express.Router();

// GET all courses
router.get("/", async (req, res) => {
  try {
    const courses = await Course.find();
    if (!req.cookies?.token) {
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
    res.json(courses);
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error.message });
  }
});

export default router;
