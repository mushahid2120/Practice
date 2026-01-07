import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileRoutes from "./routes/fileRoutes.js";
import dirRoutes from "./routes/dirRoutes.js";
import authRoutes from "./routes/userRoutes.js";
import checkAuth from "./middleware/authCheckMW.js";
import connectDB from "./config/db.js";
import { mySecret } from "./Controller/userController.js";
import otpRouter from "./routes/otpRoutes.js";

const port=process.env.PORT || 4000

const app = express();
app.use(express.json());

app.use(cookieParser(mySecret));
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));

await connectDB();

app.use("/directory", checkAuth, dirRoutes);
app.use("/files", checkAuth, fileRoutes);
app.use("/auth", authRoutes);
app.use('/otp',otpRouter)

// app.use((err, req, res, next) => {
//   console.log("Global error handler");
//   return res.status(500).json({err})
//   // return res.status(req.status || 500).json({ error: "something-went-wrong" });
// });

app.listen(port, () => {
  console.log("Server is Running on port number 4000");
});
