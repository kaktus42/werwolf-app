import { configureStore } from "@reduxjs/toolkit";
import gameSlice from "./game";
import uiSlice from "./ui";

export const store = configureStore({
  reducer: {
    ui: uiSlice,
    game: gameSlice,
  },
  devTools: true
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
