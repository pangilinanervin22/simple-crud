import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface myState {
	message: string;
	variant: "error" | "success" | "warning" | "info";
}

const initialState = {
	open: false,
	message: "Hello World",
	variant: "success",
	status: "idle",
	timeout: 2000,
};

const notificationSlice = createSlice({
	name: "notification",
	initialState,
	reducers: {
		showNotification(state, action: PayloadAction<myState>) {
			state.open = true;
			state.message = action.payload.message;
			state.variant = action.payload.variant;
		},

		closeNotification(state) {
			state.open = false;
		},
	},
});

export const { showNotification, closeNotification } =
	notificationSlice.actions;

export const selectNotificationState = (state: RootState) => state.notification;

export default notificationSlice;
