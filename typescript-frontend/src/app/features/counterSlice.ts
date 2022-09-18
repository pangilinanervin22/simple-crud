import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface myState {
	count: number;
	status: string;
}

const initialState = {
	count: 1,
	status: "idle",
};

const counterSlice = createSlice({
	name: "counter",
	initialState,
	reducers: {
		increment(state) {
			state.count++;
		},
		decrement(state) {
			console.log("increment");
			state.count--;
		},
		changeValueByAmount(state, action: PayloadAction<number>) {
			state.count = action.payload;
		},
	},
});

export const { increment, decrement, changeValueByAmount } =
	counterSlice.actions;

export const selectCountState = (state: RootState) => state.counter;

export default counterSlice;
