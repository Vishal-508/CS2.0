import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';
import endpoints from '../../api/endpoints';

export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post(endpoints.REGISTER, userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await api.post(endpoints.LOGIN, credentials);
      localStorage.setItem('token', response.data.token);
      return response.data;
    } catch (error) {
      // Return consistent error structure
      return rejectWithValue({
        message: error.response?.data?.message || 'Invalid email or password'
      });
    }
  }
);

// export const loginUser = createAsyncThunk(
//   'auth/login',
//   async (credentials, { rejectWithValue }) => {
//     try {
//       const response = await api.post(endpoints.LOGIN, credentials);
//       localStorage.setItem('token', response.data.token);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

export const getCurrentUser = createAsyncThunk(
  'auth/me',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(endpoints.ME);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await api.get(endpoints.LOGOUT);
      localStorage.removeItem('token');
      return null;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: localStorage.getItem('token') || null,
    status: 'idle',
    error: null,
    registerSuccess: false, 
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
      resetRegisterSuccess: (state) => { // Add this reducer
      state.registerSuccess = false;
    },
  },
 // authSlice.js - modify the extraReducers section
extraReducers: (builder) => {
  builder
    .addCase(registerUser.pending, (state) => {
      state.status = 'loading';
      state.registerSuccess = false;
      state.error = null; // Clear previous errors
    })
    .addCase(registerUser.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.registerSuccess = true;
      state.error = null;
    })
    .addCase(registerUser.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload?.message || 'Registration failed';
    })
    .addCase(loginUser.pending, (state) => {
      state.status = 'loading';
      state.error = null;
    })
    .addCase(loginUser.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.error = null;
    })
    .addCase(loginUser.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload?.message || 'Login failed';
    })
    .addCase(getCurrentUser.pending, (state) => {
      state.status = 'loading';
      state.error = null;
    })
    .addCase(getCurrentUser.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.user = action.payload;
      state.error = null;
    })
    .addCase(getCurrentUser.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload?.message || 'Session expired';
      state.token = null;
      localStorage.removeItem('token');
    })
    .addCase(logoutUser.fulfilled, (state) => {
      state.user = null;
      state.token = null;
      state.status = 'idle';
      state.error = null;
    });
},
});

export const { clearError, resetRegisterSuccess  } = authSlice.actions;
export default authSlice.reducer;