import express from "express";
import cors from 'cors'
import fileRoutes from './routes/fileRoutes.js'
import dirRoutes from './routes/dirRoutes.js'
import authRoutes from './routes/authRoutes.js'



const app = express();
app.use(express.json());

app.use(cors());



app.use('/directory',dirRoutes)
app.use('/files',fileRoutes)
app.use('/auth',authRoutes)

app.use((err,req,res,next)=>{
  console.log('Global error handler')
  // return res.json({message: 'this is an error '})
  return res.status(req.status || 500).json({error:'something-went-wrong'})
})
app.listen(4000, () => {
  console.log("Server is Running on port number 4000");
});
