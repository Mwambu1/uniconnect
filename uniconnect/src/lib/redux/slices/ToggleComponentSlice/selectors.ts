import { RootState } from "../../store";

export const selectNotificationsToggle = (state: RootState) => state.componentToggles.notificationToggle;

export const selectMessagesToggle = (state: RootState) => state.componentToggles.messagesToggle;