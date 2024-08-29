import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteTodo, completeTodo, editTodo, fetchTodos } from '../redux/slices/todoSlice';
import { toast } from 'react-toastify';

const Todos = () => {
  const todos = useSelector((state) => state.todos.todos);
  const isLoading = useSelector((state) => state.todos.status === 'loading');
  const dispatch = useDispatch();

  const [editingTodoId, setEditingTodoId] = useState(null);
  const [editTodoName, setEditTodoName] = useState('');
  const [editTodoDescription, setEditTodoDescription] = useState('');

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleDeleteTodo = async (todoId) => {
    try {
      await dispatch(deleteTodo(todoId)).unwrap();
      toast.success('Todo deleted successfully!');
      dispatch(fetchTodos());
    } catch (error) {
      toast.error(error.message || 'Failed to delete todo.');
    }
  };

  const handleCompleteTodo = async (todo) => {
    try {
      await dispatch(completeTodo(todo._id)).unwrap();
      if (todo.isToDoCompleted) {
        toast.success('Todo marked as incomplete!');
      } else {
        toast.success('Todo marked as completed!');
      }
      dispatch(fetchTodos());
    } catch (error) {
      toast.error(error.message || 'Failed to complete todo.');
    }
  };

  const handleEditTodo = (todo) => {
    setEditingTodoId(todo._id);
    setEditTodoName(todo.todoName);
    setEditTodoDescription(todo.todoDescription);
  };

  const handleSaveEdit = async () => {
    const updatedData = { todoName: editTodoName, todoDescription: editTodoDescription };
    try {
      await dispatch(editTodo({ todoId: editingTodoId, updatedData })).unwrap();
      toast.success('Todo updated successfully!');
      setEditingTodoId(null); // Exit edit mode
      dispatch(fetchTodos());
    } catch (error) {
      toast.error(error.message || 'Failed to update todo.');
    }
  };

  const handleCancelEdit = () => {
    setEditingTodoId(null); // Exit edit mode without saving
  };

  return (
    <>
      {isLoading ? (
        <p>Loading todos...</p>
      ) : (
        todos?.map((todo) => (
          <div key={todo._id} className="__todos bg-slate-800 min-h-[100px] p-4 m-4 w-[94%] sm:w-[90%] md:w-[80%] lg:w-[90%] xl:w-[70%] rounded-xl flex justify-between px-4 items-center">
            <div className={`flex flex-col gap-1 ${todo.isToDoCompleted ? 'line-through' : ''}`}>
              {editingTodoId === todo._id ? (
                <>
                  <input
                    type="text"
                    value={editTodoName}
                    onChange={(e) => setEditTodoName(e.target.value)}
                    className="bg-slate-600 rounded-lg text-white border-none outline-none p-2 mb-2"
                  />
                  <input
                    type="text"
                    value={editTodoDescription}
                    onChange={(e) => setEditTodoDescription(e.target.value)}
                    className="bg-slate-600 rounded-lg text-white border-none outline-none p-2"
                  />
                </>
              ) : (
                <>
                  <h1 className="text-orange-500 text-2xl">{todo.todoName}</h1>
                  <p>{todo.todoDescription}</p>
                </>
              )}
            </div>
            <div className="flex gap-3 sm:gap-4 flex-col sm:flex-row">
              {editingTodoId === todo._id ? (
                <>
                  <button onClick={handleSaveEdit} className="bg-green-700 p-2 rounded-xl text-white border-2 border-green-500 cursor-pointer hover:scale-105 transition-all ease-in-out duration-300">
                    Save
                  </button>
                  <button onClick={handleCancelEdit} className="bg-gray-700 p-2 rounded-xl text-white border-2 border-gray-500 cursor-pointer hover:scale-105 transition-all ease-in-out duration-300">
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button onClick={() => handleEditTodo(todo)} className="bg-slate-700 p-2 rounded-xl text-blue-500 border-2 border-blue-500 cursor-pointer hover:scale-105 transition-all ease-in-out duration-300">
                    Edit
                  </button>
                  <button onClick={() => handleCompleteTodo(todo)} className="bg-slate-700 p-2 rounded-xl text-green-500 border-2 border-green-500 cursor-pointer hover:scale-105 transition-all ease-in-out duration-300">
                    Complete
                  </button>
                  <button onClick={() => handleDeleteTodo(todo._id)} className="bg-slate-700 p-2 rounded-xl text-red-500 border-2 border-red-500 cursor-pointer hover:scale-105 transition-all ease-in-out duration-300">
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>
        ))
      )}
    </>
  );
};

export default Todos;
