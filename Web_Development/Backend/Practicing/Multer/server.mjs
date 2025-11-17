import express from "express";
import multer from "multer";
import cors from "cors";

const app = express();

app.use(cors());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.get("/", (req, res) => {
  res.send("Server is taking request");
});

app.post(
  "/",
  upload.fields([
    { name: "myfile", maxCount: 1 },
    { name: "multifile", maxCount: 5 },
  ]),
  (req, res) => {
    // app.post('/',(req,res)=>{
    //     req.on('data',(chunk)=>{
    //         console.log(chunk.toString())
    //     })
    res.json(req.files)
    // res.json({ message: "Uploaded" });
  }
);

app.listen(4000, "0.0.0.0", () => {
  console.log("Server is running on 4000");
});
