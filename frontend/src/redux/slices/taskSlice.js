import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api.js';

export const fetchTasks = createAsyncThunk('tasks/fetchAll', async (_, thunkAPI) => {
  try {
    const res = await api.get('/tasks');
    return res.data.tasks;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to fetch tasks');
  }
});

export const createTask = createAsyncThunk('tasks/create', async (payload, thunkAPI) => {
  try {
    const res = await api.post('/tasks', payload);
    return res.data.task;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to create task');
  }
});

export const updateTask = createAsyncThunk('tasks/update', async ({ id, data }, thunkAPI) => {
  try {
    const res = await api.put(`/tasks/${id}`, data);
    return res.data.task;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to update task');
  }
});

export const deleteTask = createAsyncThunk('tasks/delete', async (id, thunkAPI) => {
  try {
    await api.delete(`/tasks/${id}`);
    return id;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to delete task');
  }
});

const taskSlice = createSlice({
  name: 'tasks',
  initialState: { items: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchTasks.fulfilled, (state, action) => { state.loading = false; state.items = action.payload; })
      .addCase(fetchTasks.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(createTask.fulfilled, (state, action) => { state.items.unshift(action.payload); })
      .addCase(updateTask.fulfilled, (state, action) => {
        const idx = state.items.findIndex(t => t._id === action.payload._id);
        if (idx !== -1) state.items[idx] = action.payload;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.items = state.items.filter(t => t._id !== action.payload);
      });
  }
});

export default taskSlice.reducer;
