import { AlertColor } from "@mui/material";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface addingPayLoad {
	message: string;
	actionClick: Function;
}

interface state {
	message: string;
	variant: AlertColor;
	open: boolean;
	status: string;
	timeout: number;
	actionClick: Function;
}

const initialState: state = {
	open: false,
	message: "Hello World",
	variant: "success",
	status: "idle",
	timeout: 2000,
	actionClick: () => console.log(),
};

const confirmationSlice = createSlice({
	name: "confirmation",
	initialState,
	reducers: {
		showConfirmation(state, action: PayloadAction<addingPayLoad>) {
			const { message, actionClick } = action.payload;
			state.open = true;
			state.message = message;
			state.actionClick = actionClick;
		},

		closeConfirmation(state) {
			state.open = false;
		},
	},
});

export const { showConfirmation, closeConfirmation } =
	confirmationSlice.actions;

export const selectConfirmationState = (state: RootState) => state.confirmation;

export default confirmationSlice;
