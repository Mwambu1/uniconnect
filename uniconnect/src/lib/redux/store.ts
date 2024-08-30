import { configureStore } from "@reduxjs/toolkit";
import { toggleComponentSlice } from "./slices/ToggleComponentSlice/toggleComponentsSlice";
import { posts } from "./slices/posts/postsSlice";

export const store = configureStore({
    reducer: {
        componentToggles: toggleComponentSlice.reducer,
        posts: posts.reducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;