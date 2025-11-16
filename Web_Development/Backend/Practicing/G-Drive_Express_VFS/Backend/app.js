import express from "express";
import cors from 'cors'
import fileRoutes from './routes/fileRoutes.js'
import dirRoutes from './routes/dirRoutes.js'



const app = express();

app.use(express.json());

app.use(cors());

app.use('/directory',dirRoutes)
app.use('/files',fileRoutes)

app.listen(4000, () => {
  console.log("Server is Running on port number 4000");
});
