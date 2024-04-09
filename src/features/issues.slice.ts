import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getIssuesData } from "../api/getData";
import { IssueNormalized } from "../types/IssueNormalized";

interface InitialStateIssue {
  issues: IssueNormalized[][];
  loading: boolean;
  error: string;
}

const initialState: InitialStateIssue = {
  issues: [[], [], []],
  loading: true,
  error: "",
};

const IssuesSlice = createSlice({
  name: "issues",
  initialState,
  reducers: {
    setIssues: (state, action) => {
      state.issues = action.payload;
    },
    move: (state, action) => {
      const { id, status, sourceId, destinationIndex, owner, repo } = action.payload;
      const issueIndex = state.issues[sourceId].findIndex(issue => issue.id === id);
    
      if (issueIndex !== -1) {
        const [issue] = state.issues[sourceId].splice(issueIndex, 1);

        issue.state = status;

        const destinationId = status === "open" ? 0 : status === "in progress" ? 1 : 2;
        state.issues[destinationId].splice(destinationIndex, 0, issue);
        sessionStorage.setItem(`issues-${owner}-${repo}`, JSON.stringify(state.issues));
      }
    },
    reorder: (state, action) => {
      const { sourceId, destinationId, sourceIndex, destinationIndex, owner, repo  } = action.payload;
      const movedIssue = state.issues[sourceId][sourceIndex];
      state.issues[sourceId].splice(sourceIndex, 1);
      state.issues[destinationId].splice(destinationIndex, 0, movedIssue);
      sessionStorage.setItem(`issues-${owner}-${repo}`, JSON.stringify(state.issues));
    },
  },
  extraReducers: (builder) => {
    builder.addCase(init.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(init.fulfilled, (state, action) => {
      state.issues = action.payload;
      state.loading = false;
    });
    builder.addCase(init.rejected, (state) => {
      state.loading = false;
      state.error = "error";
    });
  },
});

export const { actions } = IssuesSlice;
export default IssuesSlice.reducer;

export const init = createAsyncThunk("issues/fetch",  async ({ owner, repo }: { owner: string; repo: string }) => {
  return getIssuesData(owner, repo);
});
