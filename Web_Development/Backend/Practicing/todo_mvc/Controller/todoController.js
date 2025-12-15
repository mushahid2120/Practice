import { ObjectId } from "mongodb";

export const getAllTodos=async(req,res,next)=>{
    try {
        const todoList = await req.db.collection('task').find().toArray();
        // return res.json({todoList});
        res.render('index.jsx',{todoList})
    } catch (error) {
        console.log(error)
        return res.json({error: "something went wrong"});
    }
}

export const addTodo=async(req,res,next)=>{
    try {
        const {task}=req.body;
        await req.db.collection('task').insertOne({task,completed: false});
        // return res.json({message: "Insert Succussfully "});
        res.redirect('/todo')
    } catch (error) {
        console.log(error)
        return res.json({error: "can't insert"});
    }
}

export const deleteTodo=async(req,res,next)=>{
    try {
        const todoId = req.params.todoId;
        await req.db.collection('task').deleteOne({_id: new ObjectId(todoId)});
        return res.json({message: "Deleted Succussfully"});
        
    } catch (error) {
        console.log(error);
        res.json({error: "can't delete"});
    }
}