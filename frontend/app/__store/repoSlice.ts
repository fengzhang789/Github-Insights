import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type RepoListState = [] | Array<any>;

interface RepoSliceState {
  RepoList: RepoListState;
}

const initialState: RepoSliceState = {
  RepoList: [],
};

const repoSlice = createSlice({
  name: 'repo',
  initialState,
  reducers: {
    setRepoList: (state, action: PayloadAction<RepoListState>) => {
      state.RepoList = action.payload;
    },
  },
});

export const { setRepoList } = repoSlice.actions;
export default repoSlice.reducer;