import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const secretKey='mySecretKey'

const router = express.Router();

// Register new user
router.post("/register", async (req, res) => {
  try {
    const { email, password, name } = req.body;
    console.log({ email, password, name })

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create new user
    const user = new User({
      email,
      password,
      name,
    });

    await user.save();

    console.log(user)

    res.status(201).json({
      message: "User registered successfully"});
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error.message });
  }
});

// Login user
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

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

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id },
      secretKey,
      { expiresIn: "24h" }
    );

    const cookieConfig={
      httpOnly: true
    }

    res.cookie('token',token,cookieConfig)

    res.status(200).json({message: "Login successful"});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/logout',(req,res)=>{
  res.clearCookie('token');
  return res.status(200).json({message: 'User Logout Succussfull'})
})

export default router;
