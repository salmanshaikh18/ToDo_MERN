import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
  {
    todoName: {
      type: String,
      required: [true, "todo name is required!"],
    },
    todoDescription: {
      type: String,
      required: [true, "todo description is required!"],
    },
    isToDoCompleted: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
  }
);

export const ToDo = mongoose.model("ToDo", todoSchema);
