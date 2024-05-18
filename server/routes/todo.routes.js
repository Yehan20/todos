import express  from "express";
import todoController from "../controller/todo.controller.js";
const todoRouter = express.Router();


todoRouter.post('/add',todoController.addTodo)
todoRouter.get('/all',todoController.getTodos)
todoRouter.get('/sortName',todoController.sortByName)
todoRouter.delete('/delete/:id',todoController.deleteTodo)
todoRouter.put('/update',todoController.updateTodo)
todoRouter.put('/update-task/:id',todoController.updateTask)

export default todoRouter;
