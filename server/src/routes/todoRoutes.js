import express from "express"
import { CompleteToDo, CreateToDo, DeleteToDo, EditToDo, GetAllToDo } from "../controllers/todoController.js"

export const todoRouter = express.Router()

todoRouter.post("/create-todo", CreateToDo)
todoRouter.get("/todos", GetAllToDo)
todoRouter.delete("/delete-todo", DeleteToDo)
todoRouter.put("/edit-todo/:todoId", EditToDo)
todoRouter.get("/complete-todo/:todoId", CompleteToDo)