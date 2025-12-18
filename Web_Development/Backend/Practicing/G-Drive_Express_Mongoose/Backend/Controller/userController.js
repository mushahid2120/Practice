import Users from "../Model/userModel.js";
import Dir from "../Model/dirModel.js";
import mongoose from "mongoose";

export const signup = async (req, res, next) => {
  const { name, email, password } = req.body;
  const userId = new mongoose.Types.ObjectId();
  const dirId = new mongoose.Types.ObjectId();

  const session=await mongoose.startSession();
  try {
    const user = await Users.findOne({ email });
    if (user) {
      return res.json({ message: "email already exit " });
    }

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

    console.log({ dirResult, userResult });
    session.commitTransaction()

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
    return res.json(error)
    next(error);
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  // const userData=userList.find((user)=>user.email===email && user.password===password)
  const user = await Users.findOne({ email, password });

  const cookieCofig = {
    sameSite: "none",
    secure: true,
    path: "/",
  };
  if (user) {
    res.cookie("userId", user._id.toString(), cookieCofig);
    return res.json({ message: "Login Successful" });
  } else return res.status(401).json({ error: "Invalid Credentials" });
};

export const logout = (req, res) => {
  const cookieCofig = {
    sameSite: "none",
    secure: true,
    path: "/",
    maxAge: 0,
  };
  res.cookie("userId", "", cookieCofig);
  res.json({ message: "Logout Successfull" });
};

export const getUser = (req, res) => {
  res.status(200).json({ name: req.user.name, email: req.user.email });
};
