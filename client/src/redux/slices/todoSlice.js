import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BACKEND_URI;

// Async Thunks for CRUD operations

// Fetch all todos
export const fetchTodos = createAsyncThunk('todos/fetchTodos', async (_, thunkAPI) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/todos`);
    console.log("Response of fetchTodosL ", response)
    return response.data.todos; 
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response ? error.response.data.message : 'Failed to fetch todos');
  }
});

// Create a new todo
export const createTodo = createAsyncThunk('todos/createTodo', async (todoData, thunkAPI) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/create-todo`, todoData);
    console.log("Response inside createTodo: ", response);
    return response.data.createdTodo;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response ? error.response.data.message : 'Failed to create todo');
  }
});

// Edit a todo
export const editTodo = createAsyncThunk('todos/editTodo', async ({ todoId, updatedData }, thunkAPI) => {
  try {
    const response = await axios.put(`${BASE_URL}/api/edit-todo/${todoId}`, updatedData);
    return { todoId, updatedData }; // Return the updated data and id for the reducer
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response ? error.response.data.message : 'Failed to edit todo');
  }
});

// Delete a todo
export const deleteTodo = createAsyncThunk('todos/deleteTodo', async (todoId, thunkAPI) => {
  try {
    const response = await axios.delete(`${BASE_URL}/api/delete-todo`, { data: { todoId } });
    return { todoId, message: response.data.message }; // Return id and message for the reducer
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response ? error.response.data.message : 'Failed to delete todo');
  }
});

// Complete a todo
export const completeTodo = createAsyncThunk('todos/completeTodo', async (todoId, thunkAPI) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/complete-todo/${todoId}`);
    return response.data.completedTodo;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response ? error.response.data.message : 'Failed to complete todo');
  }
});

// Todos Slice
const todosSlice = createSlice({
  name: 'todos',
  initialState: {
    todos: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch todos
      .addCase(fetchTodos.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.todos = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Create todo
      .addCase(createTodo.fulfilled, (state, action) => {
        state.todos.push(action.payload);
      })
      .addCase(createTodo.rejected, (state, action) => {
        state.error = action.payload;
      })
      // Edit todo
      .addCase(editTodo.fulfilled, (state, action) => {
        const { todoId, updatedData } = action.payload;
        const index = state.todos.findIndex(todo => todo._id === todoId);
        if (index !== -1) {
          state.todos[index] = { ...state.todos[index], ...updatedData };
        }
      })
      .addCase(editTodo.rejected, (state, action) => {
        state.error = action.payload;
      })
      // Delete todo
      .addCase(deleteTodo.fulfilled, (state, action) => {
        const { todoId } = action.payload;
        state.todos = state.todos.filter(todo => todo._id !== todoId);
      })
      .addCase(deleteTodo.rejected, (state, action) => {
        state.error = action.payload;
      })
      // Complete todo
      .addCase(completeTodo.fulfilled, (state, action) => {
        const updatedTodo = action.payload;
        const index = state.todos.findIndex(todo => todo._id === updatedTodo._id);
        if (index !== -1) {
          state.todos[index] = updatedTodo;
        }
      })
      .addCase(completeTodo.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default todosSlice.reducer;
