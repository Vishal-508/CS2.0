

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';
import endpoints from '../../api/endpoints';

export const castVote = createAsyncThunk(
  'votes/castVote',
  async (issueId, { rejectWithValue }) => {
    try {
      const response = await api.post(
        endpoints.VOTE.replace(':issueId', issueId)
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteVote = createAsyncThunk(
  'votes/deleteVote',
  async (issueId, { rejectWithValue }) => {
    try {
      const response = await api.delete(
        endpoints.DELETE_VOTE.replace(':issueId', issueId)
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const checkVote = createAsyncThunk(
  'votes/checkVote',
  async (issueId, { rejectWithValue }) => {
    try {
      const response = await api.get(
        endpoints.CHECK_VOTE.replace(':issueId', issueId)
      );
      return { issueId, hasVoted: response.data.hasVoted };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const votesSlice = createSlice({
  name: 'votes',
  initialState: {
    votedIssues: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(castVote.pending, (state) => {
        state.loading = true;
      })
      .addCase(castVote.fulfilled, (state, action) => {
        state.loading = false;
        if (!state.votedIssues.includes(action.payload.issueId)) {
          state.votedIssues.push(action.payload.issueId);
        }
      })
      .addCase(castVote.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteVote.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteVote.fulfilled, (state, action) => {
        state.loading = false;
        state.votedIssues = state.votedIssues.filter(
          id => id !== action.payload.issueId
        );
      })
      .addCase(deleteVote.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(checkVote.fulfilled, (state, action) => {
        if (action.payload.hasVoted && !state.votedIssues.includes(action.payload.issueId)) {
          state.votedIssues.push(action.payload.issueId);
        } else if (!action.payload.hasVoted) {
          state.votedIssues = state.votedIssues.filter(
            id => id !== action.payload.issueId
          );
        }
      });
  },
});

export default votesSlice.reducer;

// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import api from '../../api/axios';
// import endpoints from '../../api/endpoints';

// export const castVote = createAsyncThunk(
//   'votes/castVote',
//   async (issueId, { rejectWithValue }) => {
//     try {
//       const response = await api.post(
//         endpoints.VOTE.replace(':issueId', issueId)
//       );
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// export const checkVote = createAsyncThunk(
//   'votes/checkVote',
//   async (issueId, { rejectWithValue }) => {
//     try {
//       const response = await api.get(
//         endpoints.CHECK_VOTE.replace(':issueId', issueId)
//       );
//       return { issueId, hasVoted: response.data.hasVoted };
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// const votesSlice = createSlice({
//   name: 'votes',
//   initialState: {
//     votedIssues: [],
//     loading: false,
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(castVote.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(castVote.fulfilled, (state, action) => {
//         state.loading = false;
//         if (!state.votedIssues.includes(action.payload.issueId)) {
//           state.votedIssues.push(action.payload.issueId);
//         }
//       })
//       .addCase(castVote.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       .addCase(checkVote.fulfilled, (state, action) => {
//         if (action.payload.hasVoted && !state.votedIssues.includes(action.payload.issueId)) {
//           state.votedIssues.push(action.payload.issueId);
//         }
//       });
//   },
// });

// export default votesSlice.reducer;