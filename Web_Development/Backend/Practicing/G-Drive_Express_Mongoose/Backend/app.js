import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileRoutes from "./routes/fileRoutes.js";
import dirRoutes from "./routes/dirRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import checkAuth from "./middleware/authCheck.js";
import connectDB from "./config/db.js";

const app = express();
app.use(express.json());

app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

await connectDB();

app.use("/directory", checkAuth, dirRoutes);
app.use("/files", checkAuth, fileRoutes);
app.use("/auth", authRoutes);

// app.use((err, req, res, next) => {
//   console.log("Global error handler");
//   // return res.json({message: 'this is an error '})
//   return res.status(req.status || 500).json({ error: "something-went-wrong" });
// });

app.listen(4000, () => {
  console.log("Server is Running on port number 4000");
});
