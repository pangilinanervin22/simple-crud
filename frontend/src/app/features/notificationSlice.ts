import { AlertColor } from "@mui/material";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface addingPayLoad {
	message: string;
	variant: AlertColor;
}

interface state {
	message: string;
	variant: AlertColor;
	open: boolean;
	status: string;
	timeout: number;
}

const initialState: state = {
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
		showNotification(state, action: PayloadAction<addingPayLoad>) {
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
