import { configureStore } from "@reduxjs/toolkit";
import { allUsers } from "@root/data/users";
import { useDispatch } from "react-redux";
import counterSlice from "./features/counterSlice";
import userSlice, { addUser } from "./features/userSlice";

const store = configureStore({
	reducer: {
		[counterSlice.name]: counterSlice.reducer,
		[userSlice.name]: userSlice.reducer,
	},
	devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export default store;

allUsers.forEach((e) => store.dispatch(addUser({ ...e })));