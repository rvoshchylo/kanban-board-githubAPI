import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getRepoData } from "../api/getData";
import { RepositoryNormalized } from "../types/RepositoryNormalized";


interface InitialState {
  repository: RepositoryNormalized | null;
  loading: boolean;
  error: string;
}

const initialState: InitialState = {
  repository: null,
  loading: true,
  error: "",
};

const repositorySlice = createSlice({
  name: "repository",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(init.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(init.fulfilled, (state, action) => {
      state.repository = action.payload;
      state.loading = false;
    });
    builder.addCase(init.rejected, (state) => {
      state.loading = false;
      state.error = "error";
    });
  },
});

export default repositorySlice.reducer;

export const init = createAsyncThunk("repository/fetch",  async ({ owner, repo }: { owner: string; repo: string }) => {
  return getRepoData(owner, repo);
});