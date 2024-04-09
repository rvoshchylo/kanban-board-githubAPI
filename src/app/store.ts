import { configureStore } from "@reduxjs/toolkit";
import issuesReducer from "../features/issues.slice";
import repoReducer from "../features/repository.slice";

export const store = configureStore({
  reducer: {
    issues: issuesReducer,
    repo: repoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;