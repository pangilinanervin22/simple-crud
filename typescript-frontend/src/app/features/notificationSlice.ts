import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface myState {
	open: boolean;
	message: string;
	typeColor: string;
	status: string;
	timeout: number;
}

const initialState = {
	open: false,
	message: "Hello World",
	typeColor: "",
	status: "idle",
	timeout: 2000,
};

const notificationSlice = createSlice({
	name: "notification",
	initialState,
	reducers: {
		// showNotification(state, action: PayloadAction<myState>) {
		// 	state.message = action.payload.message;
		// },
		showNotification(state) {
			state.open = true;
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
