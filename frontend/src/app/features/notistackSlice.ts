import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState = { notifications: [] };

const notistackSlice = createSlice({
	name: "notistack",
	initialState,
	reducers: {
		// showNotification(state, action: PayloadAction<myState>) {
		// 	state.message = action.payload.message;
		// },
		addNotistack(state, action) {
			state.notifications.push(action.payload);
		},

		removeNotistack(state, payload) {
			state.notifications.filter(action.payload);
		},
	},
});

export const { addNotistack: showNotification, removeNotistack } =
	notistackSlice.actions;

export const selectNotiStackState = (state: RootState) => state.notistack;

export default notistackSlice;
