import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cookieParser())

app.use(
  cors({
    origin: "http://localhost:5500",
    credentials: true,
  })
);

// app.use((_, res, next) => {
//     res.header("Access-Control-Allow-Origin", 'http://localhost:5500');
//     res.header("Access-Control-Allow-Headers", "*");
//     res.header("Access-Control-Allow-Credentials", "true");
//     next();
//   });

app.get("/", (req, res) => {
    
    // res.cookie('name','Mushahid',{
    //   sameSite: 'none',
    //   secure: true,
    //   httpOnly:true,
    // })

  // console.log(req.cookies.name)
  res.json({ message: "Server is running" });
});

app.listen(4000, "0.0.0.0", (req, res) => {
  console.log("Server is Runing on 4000");
});
