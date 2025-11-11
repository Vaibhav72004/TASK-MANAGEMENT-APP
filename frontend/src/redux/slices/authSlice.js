import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api.js';

const tokenFromStorage = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

export const registerUser = createAsyncThunk('auth/register', async (payload, thunkAPI) => {
  try {
    const res = await api.post('/auth/register', payload);
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Registration failed');
  }
});

export const loginUser = createAsyncThunk('auth/login', async (payload, thunkAPI) => {
  try {
    const res = await api.post('/auth/login', payload);
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Login failed');
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: { token: tokenFromStorage, user: null, loading: false, error: null },
  reducers: {
    logout(state) {
      state.token = null;
      state.user = null;
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true; state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false; state.user = action.payload.user; state.token = action.payload.token;
        localStorage.setItem('token', action.payload.token);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false; state.error = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true; state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false; state.user = action.payload.user; state.token = action.payload.token;
        localStorage.setItem('token', action.payload.token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false; state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
