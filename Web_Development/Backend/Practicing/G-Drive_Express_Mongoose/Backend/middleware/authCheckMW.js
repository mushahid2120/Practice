import Session from "../Model/sessionModel.js";
import Users from "../Model/userModel.js";

export default async function checkAuth(req, res, next) {
  try {
    const { sid } = req.signedCookies;

    //signature matched (true) if failed (false)
    if (sid === false)
      res.clearCookie("sid", { sameSite: "None", secure: true });
    if (!sid) return res.status(401).json({ error: "Not Logged In..." });

    const session = await Session.findById(sid);
    if (!session){
      res.clearCookie("sid", { sameSite: "None", secure: true });
      return res
        .status(401)
        .json({ error: "Session Expired or Invalid Session" });}

    //finding User from database
    const user = await Users.findById(session.userId).lean();
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
