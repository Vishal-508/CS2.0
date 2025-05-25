import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";
import endpoints from "../../api/endpoints";

export const fetchIssues = createAsyncThunk(
  "issues/fetchIssues",
  async (params, { rejectWithValue }) => {
    try {
      const cleanParams = Object.fromEntries(
        Object.entries(params).filter(([_, v]) => v !== undefined && v !== null)
      );
      const response = await api.get(endpoints.ISSUES, { params: cleanParams });
      return {
        data: response.data.data, // Access the nested data property
        page: params.page, // Keep track of requested page
      };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// export const fetchIssues = createAsyncThunk(
//   "issues/fetchIssues",
//   async (params, { rejectWithValue }) => {
//     try {
//       // Clean up undefined/null parameters
//       const cleanParams = Object.fromEntries(
//         Object.entries(params).filter(([_, v]) => v !== undefined && v !== null)
//       );
//       const response = await api.get(endpoints.ISSUES, { params: cleanParams });
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// export const fetchIssues = createAsyncThunk(
//   "issues/fetchIssues",
//   async (params, { rejectWithValue }) => {
//     try {
//       const response = await api.get(endpoints.ISSUES, { params });
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

export const fetchUserIssues = createAsyncThunk(
  "issues/fetchUserIssues",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(endpoints.USER_ISSUES);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchIssueDetails = createAsyncThunk(
  "issues/fetchIssueDetails",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(endpoints.SINGLE_ISSUE.replace(":id", id));
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createIssue = createAsyncThunk(
  "issues/createIssue",
  async (issueData, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      Object.keys(issueData).forEach((key) => {
        formData.append(key, issueData[key]);
      });

      const response = await api.post(endpoints.ISSUES, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchMapIssues = createAsyncThunk(
  "issues/fetchMapIssues",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(endpoints.MAP_ISSUES);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateIssue = createAsyncThunk(
  "issues/updateIssue",
  async ({ id, issueData }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      Object.keys(issueData).forEach((key) => {
        if (issueData[key] !== undefined) {
          formData.append(key, issueData[key]);
        }
      });

      const response = await api.put(
        endpoints.SINGLE_ISSUE.replace(":id", id),
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteIssue = createAsyncThunk(
  "issues/deleteIssue",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(endpoints.SINGLE_ISSUE.replace(":id", id));
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// export const fetchCategories = createAsyncThunk(
//   "issues/fetchCategories",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await api.get(endpoints.CATEGORIES);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// export const fetchStatuses = createAsyncThunk(
//   "issues/fetchStatuses",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await api.get(endpoints.STATUSES);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

const issuesSlice = createSlice({
  name: "issues",
  initialState: {
    issues: [],
    userIssues: [],
    currentIssue: null,
    // categories: [],
    categories: [ // Add hardcoded categories
    { _id: "Road", name: "Road" },
    { _id: "Water", name: "Water" },
    { _id: "Sanitation", name: "Sanitation" },
    { _id: "Electricity", name: "Electricity" },
    { _id: "Other", name: "Other" }
  ],
    // statuses: [],
    pagination: {
      page: 1,
      limit: 10,
      total: 0,
      totalPages: 1,
    },
    filters: {
      search: "",
      category: "",
      status: "",
      sort: -1,
    },
    loading: false,
    error: null,
  },
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    setPagination: (state, action) => {
      state.pagination = { ...state.pagination, ...action.payload };
    },
    clearCurrentIssue: (state) => {
      state.currentIssue = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIssues.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchIssues.fulfilled, (state, action) => {
        state.loading = false;
        state.issues = action.payload.data.issues; // Access the nested issues array
        state.pagination = {
          page: action.payload.data.page,
          limit: state.pagination.limit, // Keep the existing limit
          total: action.payload.data.total,
          totalPages: Math.ceil(action.payload.total / state.pagination.limit) 
        };
      })
      //   .addCase(fetchIssues.fulfilled, (state, action) => {
      //     state.loading = false;
      //     state.issues = action.payload.data;
      //     state.pagination = {
      //       page: action.payload.page,
      //       limit: action.payload.limit,
      //       total: action.payload.total,
      //     };
      //   })
      .addCase(fetchIssues.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchUserIssues.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserIssues.fulfilled, (state, action) => {
        state.loading = false;
        state.userIssues = action.payload;
      })
      .addCase(fetchUserIssues.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchIssueDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchIssueDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.currentIssue = action.payload;
      })
      .addCase(fetchIssueDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createIssue.pending, (state) => {
        state.loading = true;
      })
      .addCase(createIssue.fulfilled, (state, action) => {
        state.loading = false;
        state.userIssues.unshift(action.payload);
      })
      .addCase(createIssue.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateIssue.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateIssue.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.userIssues.findIndex(
          (issue) => issue._id === action.payload._id
        );
        if (index !== -1) {
          state.userIssues[index] = action.payload;
        }
        if (state.currentIssue?._id === action.payload._id) {
          state.currentIssue = action.payload;
        }
      })
      .addCase(updateIssue.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteIssue.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteIssue.fulfilled, (state, action) => {
        state.loading = false;
        state.userIssues = state.userIssues.filter(
          (issue) => issue._id !== action.payload
        );
      })
      .addCase(deleteIssue.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchMapIssues.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMapIssues.fulfilled, (state, action) => {
        state.loading = false;
        state.issues = action.payload;
      })
      .addCase(fetchMapIssues.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    //   .addCase(fetchCategories.fulfilled, (state, action) => {
    //     state.categories = action.payload;
    //   })
    //   .addCase(fetchStatuses.fulfilled, (state, action) => {
    //     state.statuses = action.payload;
    //   });
  },
});

export const { setFilters, setPagination, clearCurrentIssue } =
  issuesSlice.actions;
export default issuesSlice.reducer;
