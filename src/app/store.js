import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import issuesReducer from '../features/issues/issuesSlice';
import votesReducer from '../features/votes/votesSlice';
import analyticsReducer from '../features/analytics/analyticsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    issues: issuesReducer,
    votes: votesReducer,
    analytics: analyticsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});