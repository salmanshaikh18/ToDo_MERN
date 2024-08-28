import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Base URL for the API
const API_URL = 'http://localhost:3000/api';

// Async Thunks for CRUD operations

// Fetch all TODOs
export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  const response = await axios.get(`${API_URL}/todos`);
  return response.data.todos;
});

// Create a new TODO
export const createTodo = createAsyncThunk('todos/createTodo', async (todo) => {
  const response = await axios.post(`${API_URL}/create-todo`, todo);
  return response.data.createdTodo;
});

// Update a TODO
export const updateTodo = createAsyncThunk('todos/updateTodo', async ({ id, todo }) => {
  const response = await axios.put(`${API_URL}/edit-todo/${id}`, todo);
  return response.data;
});

// Delete a TODO
export const deleteTodo = createAsyncThunk('todos/deleteTodo', async (id) => {
  await axios.delete(`${API_URL}/delete-todo`, { data: { todoId: id } });
  return id;
});

// Mark a TODO as completed
export const toggleTodoCompletion = createAsyncThunk('todos/toggleTodoCompletion', async ({ id, isCompleted }) => {
  const response = await axios.patch(`${API_URL}/toggle-todo-completion/${id}`, { isCompleted });
  return response.data;
});

// Initial state
const initialState = {
  todos: [],
  status: 'idle',
  error: null,
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    // Non-async actions can go here if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.todos = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createTodo.fulfilled, (state, action) => {
        state.todos.push(action.payload);
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        const index = state.todos.findIndex((todo) => todo._id === action.payload._id);
        state.todos[index] = action.payload;
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.todos = state.todos.filter((todo) => todo._id !== action.payload);
      })
      .addCase(toggleTodoCompletion.fulfilled, (state, action) => {
        const index = state.todos.findIndex((todo) => todo._id === action.payload._id);
        if (index !== -1) {
          state.todos[index] = action.payload;
        }
      });
  },
});

export default todoSlice.reducer;
