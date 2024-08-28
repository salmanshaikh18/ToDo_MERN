import React from "react";

const Todos = () => {
  return (
    <>
      <div className="__todos bg-slate-800 min-h-[100px] p-4 m-4 w-[94%] sm:w-[90%] md:w-[80%] lg:w-[90%] xl:w-[70%] rounded-xl flex justify-between px-4 items-center">
        <div className="flex flex-col gap-1">
          <h1 className="text-orange-500 text-2xl">todo name...</h1>
          <p>todo description...</p>
        </div>
        <div className="flex gap-3 sm:gap-4 flex-col sm:flex-row">
          <button className="bg-slate-700 p-2 rounded-xl text-blue-500 border-2 border-blue-500 cursor-pointer hover:scale-105 transition-all ease-in-out duration-300">
            Edit
          </button>
          <button className="bg-slate-700 p-2 rounded-xl text-green-500 border-2 border-green-500 cursor-pointer hover:scale-105 transition-all ease-in-out duration-300">
            Complete
          </button>
          <button className="bg-slate-700 p-2 rounded-xl text-red-500 border-2 border-red-500 cursor-pointer hover:scale-105 transition-all ease-in-out duration-300">
            Delete
          </button>
        </div>
      </div>
    </>
  );
};

export default Todos;
