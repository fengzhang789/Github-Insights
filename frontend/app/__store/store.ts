import { configureStore } from "@reduxjs/toolkit";
import AppApi from "./api";
import viewReducer from './viewSlice';
import repoReducer from './repoSlice';


export const store = configureStore({
  reducer: {
    [AppApi.reducerPath]: AppApi.reducer,
    view: viewReducer,
    repo: repoReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: true,
    }).concat(AppApi.middleware),
  devTools: true,
});


// Gets the return type of the store.getState function
export type RootState = ReturnType<typeof store.getState>;
// Gets the type of the dispatch function of the store
export type AppDispatch = typeof store.dispatch;