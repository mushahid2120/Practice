import { mySecret } from "../Controller/userController.js";
import Users from "../Model/userModel.js";
import crypto from 'node:crypto'

export default async function checkAuth(req, res, next) {
  try {
    const { token } = req.signedCookies;

    //signature matched (true) if failed (false)
    if(token===false) res.clearCookie("token", {sameSite: "None",secure: true,});
    if (!token) return res.status(401).json({ error: "Not Logged In..." });

    //Extracting data from token
    const payloadString=Buffer.from(token,'base64url').toString()
    const {uid,expiry}=JSON.parse(payloadString)
    const currentTime=Date.now()/1000
   
    //Checking Session is expire or not
    if (expiry <= currentTime) {
      console.log("Cookie has been expire");
      res.clearCookie("token", {
        sameSite: "None",
        secure: true,
      });
      return res.status(401).json({ error: "Not Logged In" });
    }

    //finding User from database
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
