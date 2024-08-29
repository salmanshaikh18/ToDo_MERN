import React from "react";
import CreateTodo from "../components/CreateTodo";
import Todos from "../components/Todos";
import { useNavigate } from "react-router-dom";

const Todo = () => {
  const navigate = useNavigate()
  const handleBuyPremium = () => {
    navigate("/buy-premium")
  }
  return (
    <div className="flex items-center flex-col h-full w-full">
      <div className="flex justify-center items-center gap-2">
        <h1 className="text-center text-2xl font-bold my-4 sm:my-6">MyTodos</h1>
        <button onClick={handleBuyPremium} className="p-2 rounded-xl bg-purple-800 hover:bg-purple-900 transition-all ease-in-out duration-300">Buy Premium</button>
      </div>
      <CreateTodo />
      <Todos />
    </div>
  );
};

export default Todo;
