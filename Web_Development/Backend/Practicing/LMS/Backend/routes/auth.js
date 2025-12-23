import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Cart from "../models/Cart.js";
import Session from "../models/Session.js";

export const secretKey = "mySecretKey";

const router = express.Router();

// Register new user
router.post("/register", async (req, res) => {
  try {
    const { email, password, name } = req.body;
    // console.log({ email, password, name });

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create new user
    const user = await User.insertOne({
      email,
      password,
      name,
    });

    //Create new Cart
    // const cart = await Cart.insertOne({
    //   userId: user._id,
    //   data: [],
    // });

    res.status(201).json({
      message: "User registered successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

// Login user
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingToken = req.cookies.token;
    const sid = jwt.verify(existingToken, secretKey, (error, sid) => {
      if (!error) return sid;
    })?.sid;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    let session;
    if (!sid) session = await Session.insertOne({ userId: user.id });
    else
      session = await Session.findOneAndUpdate(
        { _id: sid },
        { $set: { userId: user.id } },
        { new: true }
      );

    const cart = await Cart.findOne({ userId: user.id });

    if (!cart)
      await Cart.insertOne({ userId: user.id, data: [...session.data] });
    else {
      const updatedData = cart.data.map(({ courseId, quantity }) => {
        const matchIndex = session.data.findIndex((s) => {
          console.log({ s, quantity, courseId });
          return s.courseId.toString() === courseId.toString();
        });

        if (matchIndex !== -1)
          return {
            courseId,
            quantity: session.data[matchIndex].quantity + quantity,
          };
        return { courseId, quantity };
      });

      cart.set("data", updatedData);
      session.set("data", []);
      await session.save();
      await cart.save();
    }

    // Generate JWT token
    const token = jwt.sign({ sid: session.id }, secretKey, {
      expiresIn: "24h",
    });

    const cookieConfig = {
      httpOnly: true,
    };

    res.cookie("token", token, cookieConfig);
    res.status(200).json({ name: user.name, email: user.email });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

router.post("/logout", async (req, res) => {
  const { token } = req.cookies;
  const { sid } = jwt.verify(token, secretKey);
  await Session.findByIdAndDelete(sid);
  res.clearCookie("token");
  return res.status(200).json({ message: "User Logout Succussfull" });
});

router.get("/profile", async (req, res) => {
  const token = req.cookies?.token;
  console.log(token);
  const sid = jwt.verify(token, secretKey, (error, sid) => {
    if (!error) return sid;
  })?.sid;

  if (!sid) return res.status(400).json({ message: "user not logged IN" });
  const user = await Session.findById(sid)
    .populate({ path: "userId", select: "name email -_id" })
    .select("userId")
    .lean();
  return res.status(200).json(user.userId);
});

export default router;
