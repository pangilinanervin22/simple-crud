import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import confirmationSlice from "./features/confirmationSlice";
import counterSlice from "./features/counterSlice";
import notificationSlice from "./features/notificationSlice";
import userSlice, { addUser } from "./features/userSlice";
import { allUsers } from "./users";

const store = configureStore({
	reducer: {
		[counterSlice.name]: counterSlice.reducer,
		[userSlice.name]: userSlice.reducer,
		[notificationSlice.name]: notificationSlice.reducer,
		[confirmationSlice.name]: confirmationSlice.reducer,
	},
	devTools: true,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export default store;

allUsers.forEach((e) => store.dispatch(addUser({ ...e })));
