import { createSlice } from "@reduxjs/toolkit";

interface componentToggles {
    notificationToggle: boolean,
    messagesToggle: boolean
}
const initialState: componentToggles = {
    notificationToggle: false,
    messagesToggle: false
}
export const toggleComponentSlice = createSlice({
    name: "toggleComponentsSlice",
    initialState: initialState,
    reducers: {
        setNotificationTogle: (state, action) => {
            state.notificationToggle = action.payload;
        },
        setMessagesToggle: (state,action) => {
            state.messagesToggle = action.payload;
        }
    }
})

export const { setNotificationTogle, setMessagesToggle } = toggleComponentSlice.actions
