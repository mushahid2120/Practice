import express, { json } from "express";
import authCheck from "../middleware/authCheckMW.js";
import {
  getUser,
  login,
  logout,
  logoutAll,
  signup,
} from "../Controller/userController.js";

const router = express.Router();

router.post("/singup", signup);

router.post("/login", login);

router.post("/logout", logout);

router.post("/logout-all", logoutAll);

router.get("/", authCheck, getUser);

export default router;
