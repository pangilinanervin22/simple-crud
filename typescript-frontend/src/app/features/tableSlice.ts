import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface myState {
	name: string;
	value: any;
}

const initialState = {
	currentPage: 0,
	pageSize: 15,
	sortColumn: { path: "title", order: "asc" },
	searchQuery: "",
};

const tableSlice = createSlice({
	name: "counter",
	initialState,
	reducers: {
		increment() {},

		changeValueByAmount(state, action: PayloadAction<myState>) {},
	},
});

export const { increment, changeValueByAmount } = tableSlice.actions;

export const selectCountState = (state: RootState) => state.counter;

export default tableSlice;
