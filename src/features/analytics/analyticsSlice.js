import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';
import endpoints from '../../api/endpoints';

export const fetchCategoryAnalytics = createAsyncThunk(
  'analytics/fetchCategoryAnalytics',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(endpoints.CATEGORY_ANALYTICS);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchSubmissionAnalytics = createAsyncThunk(
  'analytics/fetchSubmissionAnalytics',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(endpoints.SUBMISSION_ANALYTICS);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchMostVotedAnalytics = createAsyncThunk(
  'analytics/fetchMostVotedAnalytics',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(endpoints.MOST_VOTED_ANALYTICS);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const analyticsSlice = createSlice({
  name: 'analytics',
  initialState: {
    categoryData: [],
    submissionData: [],
    mostVotedData: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategoryAnalytics.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategoryAnalytics.fulfilled, (state, action) => {
        state.loading = false;
        state.categoryData = action.payload;
      })
      .addCase(fetchCategoryAnalytics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchSubmissionAnalytics.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSubmissionAnalytics.fulfilled, (state, action) => {
        state.loading = false;
        state.submissionData = action.payload;
      })
      .addCase(fetchSubmissionAnalytics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchMostVotedAnalytics.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMostVotedAnalytics.fulfilled, (state, action) => {
        state.loading = false;
        state.mostVotedData = action.payload;
      })
      .addCase(fetchMostVotedAnalytics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default analyticsSlice.reducer;