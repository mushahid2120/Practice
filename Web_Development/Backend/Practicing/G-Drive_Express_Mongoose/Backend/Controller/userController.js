import Users from "../Model/userModel.js";
import Dir from "../Model/dirModel.js";
import mongoose from "mongoose";
import crypto from "node:crypto";
import bcrypt from 'bcrypt' 

export const mySecret = "mysecret";

export const signup = async (req, res, next) => {
  const { name, email, password } = req.body;
  const userId = new mongoose.Types.ObjectId();
  const dirId = new mongoose.Types.ObjectId();

  const session = await mongoose.startSession();

  const hashedPassword = await bcrypt.hash(password,12)
  try {
    session.startTransaction();
    await Dir.insertOne(
      {
        _id: dirId,
        name: `root-${email}`,
        userId: userId,
      },
      { session }
    );

    await Users.insertOne(
      {
        _id: userId,
        name,
        email,
        password: hashedPassword,
        rootDirId: dirId,
      },
      { session }
    );

    session.commitTransaction();

    res.json({ message: "User Created" });
  } catch (error) {
    await session.abortTransaction();
    if (error.name === "ValidationError") {
      const [errorFor] = Object.keys(error.errors);
      const errorMessage = error.errors[errorFor].properties.message;
      return res.status(401).json({ error: { [errorFor]: errorMessage } });
    } else {
      if (error.name === "MongoServerError")
        if (error.code === 11000)
          return res
            .status(401)
            .json({ error: { email: "email already Exist " } });
      if (error.code === 121)
        return res.status(400).json({ error: "Schema Validation Error" });
    }
    next(error);
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await Users.findOne({ email });
  if (!user) return res.status(401).json({ error: "Invalid Credentials" });
  const isPasswordValid=await bcrypt.compare(password,user.password)
  
  if (!isPasswordValid)
    return res.status(401).json({ error: "Invalid Credentials" });

  const cookieCofig = {
    sameSite: "none",
    signed: true,
    secure: true,
    path: "/",
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  };

  const payloadJSONstring = JSON.stringify({
    uid: user._id.toString(),
    expiry: Math.round(Date.now() / 1000 + 15),
  });
  const payloadEncoded = Buffer.from(payloadJSONstring).toString("base64url");

  res.cookie("token", payloadEncoded, cookieCofig);
  return res.json({ message: "Login Successful" });
};

export const logout = (req, res) => {
  res.clearCookie("token", {
    sameSite: "None",
    secure: true,
    // signed: true
  });
  res.json({ message: "Logout Successfull" });
};

export const getUser = (req, res) => {
  res.status(200).json({ name: req.user.name, email: req.user.email });
};
