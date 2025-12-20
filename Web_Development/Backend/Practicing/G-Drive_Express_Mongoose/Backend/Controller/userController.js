import Users from "../Model/userModel.js";
import Dir from "../Model/dirModel.js";
import mongoose from "mongoose";
import crypto from 'node:crypto'

export const mySecret="mysecret"
export let hashValue;

export const signup = async (req, res, next) => {
  const { name, email, password } = req.body;
  const userId = new mongoose.Types.ObjectId();
  const dirId = new mongoose.Types.ObjectId();

  const session=await mongoose.startSession();
  try {
    session.startTransaction()
    const dirResult = await Dir.insertOne(
      {
        _id: dirId,
        name: `root-${email}`,
        userId: userId,
      },{session}
    );

    const userResult = await Users.insertOne(
      {
        _id: userId,
        name,
        email,
        password,
        rootDirId: dirId,
      },{session}
    );

    session.commitTransaction()

    res.json({ message: "User Created" });
  } catch (error) {
    await session.abortTransaction();
    if(error.name==="ValidationError"){
      const [errorFor]=Object.keys(error.errors)
      const errorMessage=error.errors[errorFor].properties.message  
      return res.status(401).json({error: {[errorFor]:errorMessage}})
    }
    else{
      if(error.name === 'MongoServerError' && error.code===11000)
        return res.status(401).json({error: {email: "email already Exist "}})
    }
    next(error);
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await Users.findOne({ email, password });
  
  const myDate=new Date()

  const cookieCofig = {
    sameSite: "none",
    secure: true,
    path: "/",
    httpOnly: true,
    maxAge: 1000*60*60*24*7
  };

  const cookieObject={uid: user._id.toString(),expiry: Math.round(Date.now()/1000+15)}
  const cookiePayload=Buffer.from(JSON.stringify(cookieObject)).toString('base64url')
  hashValue=crypto.createHash('sha256').update(cookiePayload).update(mySecret).digest('hex')


  if (user) {
    res.cookie("userId", cookiePayload, cookieCofig);
    return res.json({ message: "Login Successful" });
  } else return res.status(401).json({ error: "Invalid Credentials" });
};

export const logout = (req, res) => {
  res.clearCookie("userId", {
        sameSite: "None",
        secure: true,
      });
  res.json({ message: "Logout Successfull" });
};

export const getUser = (req, res) => {
  res.status(200).json({ name: req.user.name, email: req.user.email });
};
