import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { TUserRepository } from "../__typings/api";

type RepoListState = [] | Array<any>;
type NullableTUserRepository = TUserRepository | null;

interface RepoSliceState {
  RepoList: RepoListState;
  SelectedRepo: null | TUserRepository | '';
}

const initialState: RepoSliceState = {
  RepoList: [],
  SelectedRepo: null
};

const repoSlice = createSlice({
  name: 'repo',
  initialState,
  reducers: {
    setRepoList: (state, action: PayloadAction<RepoListState>) => {
      state.RepoList = action.payload;
    },
    setSelectedRepo: (state, action: PayloadAction<NullableTUserRepository>) => {
        state.SelectedRepo = action.payload;
    }
  },
});

export const { setRepoList, setSelectedRepo } = repoSlice.actions;
export default repoSlice.reducer;