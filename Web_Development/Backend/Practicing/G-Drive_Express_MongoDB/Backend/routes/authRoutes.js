import express, { json } from "express";
import authCheck from "../middleware/authCheck.js";
import { ObjectId } from "mongodb";
import { client } from "../config/db.js";

const router = express.Router();

router.post("/singup", async (req, res,next) => {
  const { name, email, password } = req.body;
  const userId = new ObjectId();
  const dirId = new ObjectId();
  const db = req.db;
  const userCollection = db.collection("user");
  const dirCollection = db.collection("directory");

  const session = client.startSession();
  try {
    const user = await userCollection.findOne({ email });
    if (user) {
      return res.json({ message: "email already exit " });
    }

    session.startTransaction();
    const dirResult = await dirCollection.insertOne({
      _id: dirId,
      name: `root-${email}`,
      parentDirId: null,
      userId: userId.toString(),
    },{session});

    const userResult = await userCollection.insertOne({
      _id: userId,
      name,
      email,
      password,
      rootDirId: dirId.toString(),
    },{session});
    await session.commitTransaction();

    console.log({ dirResult, userResult });

    // await writeFile('./userDB.json',JSON.stringify(userList))
    // await writeFile('./directoryDB.json',JSON.stringify(directoryList))

    const cookieCofig = {
      sameSite: "none",
      secure: true,
      path: "/",
    };

    res.cookie("userId", userId, cookieCofig);
    res.json({ message: "User Created" });
  } catch (error) {
    await session.abortTransaction();
    if (error.code === 121) res.status(400).json({ error: "invalid fields" });
    next(error);
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  // const userData=userList.find((user)=>user.email===email && user.password===password)
  const db = req.db;
  const userCollection = db.collection("user");
  const user = await userCollection.findOne({ email, password });

  const cookieCofig = {
    sameSite: "none",
    secure: true,
    path: "/",
  };
  if (user) {
    res.cookie("userId", user._id.toString(), cookieCofig);
    return res.json({ message: "Login Successful" });
  } else return res.status(401).json({ error: "Invalid Credentials" });
});

router.post("/logout", (req, res) => {
  const cookieCofig = {
    sameSite: "none",
    secure: true,
    path: "/",
    maxAge: 0,
  };
  res.cookie("userId", "", cookieCofig);
  res.json({ message: "Logout Successfull" });
});

router.get("/", authCheck, (req, res) => {
  res.status(200).json({ name: req.user.name, email: req.user.email });
});

export default router;
