import React, { useState } from "react";
const CreateTodo = () => {
    const [todoName, setTodoName] = useState("")
    const [todoDescription, setTodoDescription] = useState("")

    const handleAddTodo = (e) => {
    }

  return (
    <div className="h-[260px] sm:h-[200px] md:h-[200px] lg:h-40 bg-slate-800 w-[94%] sm:w-[90%] md:w-[80%] lg:w-[90%] xl:w-[70%] rounded-xl flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-10 px-10">
      <div className="w-[80%] flex justify-between lg:flex-row flex-col gap-10 items-center">
        <div className="flex flex-col gap-1">
          <label>Name</label>
          <input
            className="bg-slate-600 w-80 rounded-lg text-white border-none outline-none p-2"
            type="text"
            value={todoName}
            onChange={(e) => setTodoName(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label>Description</label>
          <input
            className="bg-slate-600 w-80 rounded-lg text-white border-none outline-none p-2"
            type="text"
            value={todoDescription}
            onChange={(e) => setTodoDescription(e.target.value)}
          />
        </div>
      </div>
      <div className="sm:w-[20%]">
        <div className="flex justify-center items-center">
          <button onClick={handleAddTodo} className="bg-orange-700 cursor-pointer transition-all ease-in-out duration-300 hover:bg-orange-800 px-4 py-2 rounded-xl">Add Todo</button>
        </div>
      </div>
    </div>
  );
};

export default CreateTodo;
