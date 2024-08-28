import { ToDo } from "../models/todoModel.js";
import { handleError } from "../utils/handleError.js";

export const CreateToDo = async (req, res) => {
  try {
    const { todoName, todoDescription } = req.body;
    if (!todoName && !todoDescription) {
      return res.status(400).json({
        message: "Please provide todoName and todoDescription",
        success: false,
      });
    }
    const isTodoExist = await ToDo.findOne({ todoName, todoDescription });
    if (isTodoExist) {
      return res.status(400).json({
        message: "This todo already created!",
        success: false,
      });
    }

    const createdTodo = await ToDo.create({
      todoName,
      todoDescription,
    });

    return res.status(201).json({
      message: "ToDo created successfully :)",
      success: true,
      createdTodo: createdTodo,
    });
  } catch (error) {
    handleError(error, "CreateToDo inside todoController.js", res);
  }
};

export const GetAllToDo = async (req, res) => {
  try {
    const todos = await ToDo.find(); // fetch all todos from database

    if (todos.length === 0) {
      return res.status(400).json({
        message: "There is not any todo, please create one!",
      });
    }

    return res.status(200).json({
      message: "ToDos retrieved successfully",
      success: true,
      todos: todos,
    });
  } catch (error) {
    handleError(error, "GetToDo inside todoController.js", res);
  }
};

export const DeleteToDo = async (req, res) => {
  try {
    const todoId = req.body.todoId;
    const isTodoExist = await ToDo.findOne({ _id: todoId });
    if (!isTodoExist) {
      return res.status(400).json({
        message: "ToDo not found with the give todoId",
        success: false,
      });
    }
    const deletedToDo = await ToDo.findByIdAndDelete(todoId);
    console.log(deletedToDo);
    return res.status(200).json({
      message: "ToDo deleted successfully",
      success: true,
    });
  } catch (error) {
    handleError(error, "DeleteToDo inside todoController.js", res);
  }
};

export const EditToDo = async (req, res) => {
  try {
    const todoId = req.params.todoId;
    const { todoName, todoDescription } = req.body;

    if (!todoName || !todoDescription) {
      return res.status(400).json({
        message: "All the fields are required!",
        success: false,
      });
    }
    const todo = await ToDo.findByIdAndUpdate(todoId, {
      todoName,
      todoDescription,
    });

    if (!todo) {
      return res.status(400).json({
        message: "ToDo not found!",
        success: false,
      });
    }

    return res.status(200).json({
      message: "ToDo updated successfully",
      success: true,
    });
  } catch (error) {
    handleError(error, "EditTodo inside todoController.js", res);
  }
};

export const CompleteToDo = async (req, res) => {
  try {
    const todoId = req.params.todoId;

    const todo = await ToDo.findOne({ _id: todoId });

    if (!todo) {
      return res.status(400).json({
        message: "ToDo not found!",
        success: false,
      });
    }

    // Toggle the completion status of the todo
    todo.isToDoCompleted = !todo.isToDoCompleted;

    // Save the updated todo
    const completedTodo = await todo.save();

    // Return the updated todo in the response
    res.status(200).json({
      message: "Todo status updated successfully!",
      success: true,
     completedTodo: completedTodo,
    });
  } catch (error) {
    handleError(error, "CompleteTodo inside todoController.js", res);
  }
};
