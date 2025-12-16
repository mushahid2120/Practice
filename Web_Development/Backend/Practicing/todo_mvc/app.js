import './db.js'; 
import express from 'express';
import cors from 'cors';
import todoRouter from './router/todoRouter.js'
import  {createEngine} from  'express-react-views'

const app=express();

app.use(express.json());
app.use(express.urlencoded())
app.use(cors());
app.use(express.static('./public'))

app.set('views','./Views');
app.set('view engine', 'jsx');
app.engine('jsx', createEngine());

app.use("/todo",todoRouter);

app.listen(4000,()=>{
    console.log("Server is running on port number 4000");
})