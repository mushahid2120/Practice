import Users from "../Model/userModel.js";
import Dir from "../Model/dirModel.js";
import mongoose from "mongoose";
import Session from '../Model/sessionModel.js'
import { verifyOtp } from "../service/sendOtp.js";
import {OAuth2Client} from 'google-auth-library'

export const mySecret = "mysecret";

export const signup = async (req, res, next) => {
  const { name, email, password,otp} = req.body;
  const isValidotp=await verifyOtp(otp,email)
  if(!isValidotp) return res.status(400).json({error: {opt: "Invalid or Expired OTP"}})

  const userId = new mongoose.Types.ObjectId();
  const dirId = new mongoose.Types.ObjectId();

  const session = await mongoose.startSession();
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
        password,
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

export const login = async (req, res,next) => {
  const { email, password } = req.body;
  const user = await Users.findOne({ email });
  if (!user) return res.status(401).json({ error: "Invalid Credentials" });
  const isPasswordValid=await user.comparePassword(password)
  
  if (!isPasswordValid)
    return res.status(401).json({ error: "Invalid Credentials" });



  const allSession=await Session.find({userId: user.id})
  if(allSession.length>3)
    await allSession[0].deleteOne()

  const session= await Session.create({userId: user.id})

  const cookieCofig = {
    sameSite: "none",
    signed: true,
    secure: true,
    path: "/",
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  };


  res.cookie("sid", session.id, cookieCofig);
  return res.json({ message: "Login Successful" });
};

export const logout = async(req, res) => {
  const { sid } = req.signedCookies;
  await Session.findByIdAndDelete(sid)
  res.clearCookie("sid", {
    sameSite: "None",
    secure: true,
    // signed: true
  });
  res.json({ message: "Logout Successfull" });
};

export const logoutAll=async(req, res) => {
  const { sid } = req.signedCookies;
  const session=await Session.findById(sid)
  await Session.deleteMany({userId: session.userId})
  res.clearCookie("sid", {
    sameSite: "None",
    secure: true,
    // signed: true
  });
  res.json({ message: "Logout All Successfull" });
};

export const getUser = (req, res) => {
  res.status(200).json({ name: req.user.name, email: req.user.email,picture: req.user.picture });
};

export const loginWithGoogle=async(req,res,next)=>{
  const idToken=req.body.credential;
  const client=new OAuth2Client();
  const googleUser=await client.verifyIdToken({idToken,audience: '334126242922-u35qsecmr9pjg1o7bg64ga2bucons5qh.apps.googleusercontent.com'})
  if(!googleUser) return res.staus(403).json({error:"User verifaction failed"});
  const {email,picture,name,sub}=googleUser.payload
  const dbUser=await Users.findOne({email});
  

  res.json({message: "Login Successfull"})
}
