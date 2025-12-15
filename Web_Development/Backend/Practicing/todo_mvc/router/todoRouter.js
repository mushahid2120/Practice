import express from 'express';
import { addTodo, deleteTodo, getAllTodos } from '../Controller/todoController.js';

const todoRouter=express.Router();

todoRouter.route('/').get(getAllTodos).post(addTodo)
todoRouter.delete('/:todoId',deleteTodo)

export default todoRouter;