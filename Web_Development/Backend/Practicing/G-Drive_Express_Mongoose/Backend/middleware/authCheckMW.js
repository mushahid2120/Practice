import { hashValue, mySecret } from "../Controller/userController.js";
import Users from "../Model/userModel.js";
import crypto from 'node:crypto'

export default async function checkAuth(req, res, next) {
  try {
    const { userId } = req.cookies;
    if (!userId) return res.status(401).json({ error: "Not Logged In" });

    const gotHashValue=crypto.createHash('sha256').update(userId).update(mySecret).digest('hex')
    console.log(gotHashValue,hashValue)
    if(gotHashValue!==hashValue){
      res.clearCookie("userId", {
        sameSite: "None",
        secure: true,
      });
      return res.status(401).json({ error: "Not Logged In" });
    }


    console.log(Buffer.from(userId,'base64url').toString())
    const {uid,expiry}=JSON.parse(Buffer.from(userId,'base64url').toString())
    const currentTime=Date.now()/1000

    const expireTime = new Date(expiry * 1000);
    const current = new Date(currentTime* 1000) ;
    console.log({
      expireTime: expireTime.toLocaleString("en-GB"),
      currentTime: current.toLocaleString("en-GB"),
    });    

    if (expiry <= currentTime) {
      console.log("Cookie has been expire");
      res.clearCookie("userId", {
        sameSite: "None",
        secure: true,
      });
      return res.status(401).json({ error: "Not Logged In" });
    }

    const user = await Users.findById(uid).lean();
    req.user = user;

    if (!user) return res.status(401).json({ error: "Not Logged In" });
    next();
  } catch (error) {
    console.log(error);
    if (error.name === "CastError")
      return res.status(400).json({ error: "Invalid UserId" });
    next(error);
  }
}
