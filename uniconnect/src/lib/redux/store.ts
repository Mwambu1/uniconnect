import { configureStore } from "@reduxjs/toolkit";
import { toggleComponentSlice } from "./slices/ToggleComponentSlice/toggleComponentsSlice";

export const store = configureStore({
    reducer: {
        componentToggles: toggleComponentSlice.reducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;