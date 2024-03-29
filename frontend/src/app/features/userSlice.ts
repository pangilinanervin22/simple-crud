import {
	createEntityAdapter,
	createSlice,
	PayloadAction,
} from "@reduxjs/toolkit";
import { Users } from "../../types";
import { RootState } from "../store";
import { allUsers } from "../users";

const userAdapter = createEntityAdapter<Users>({
	selectId: (user) => user.id,
	sortComparer: (a, b) => a.name.localeCompare(b.name),
});

const userSlice = createSlice({
	name: "user",

	initialState: userAdapter.getInitialState({
		status: "idle",
	}),
	reducers: {
		addUser(state, action: PayloadAction<Users>) {
			userAdapter.addOne(state, action.payload);
		},
		deleteUser(state, action) {
			userAdapter.removeOne(state, action.payload);
		},
		deleteManyUser(state, action) {
			userAdapter.removeMany(state, action.payload);
		},
		updateUser(state, action) {
			userAdapter.upsertOne(state, action.payload);
		},
		resetUser(state) {
			userAdapter.removeAll(state);
			userAdapter.setAll(state, allUsers);
		},
	},
});

export const {
	selectAll: selectAllUsers,
	selectById: selectUserById,
	selectTotal: selectTotalUser,
} = userAdapter.getSelectors((state: RootState) => state.user);

export const { addUser, deleteUser, updateUser, deleteManyUser, resetUser } =
	userSlice.actions;

export const userStatus = (state: RootState) => state.user.status;
export const userById = (state: RootState, id: string) =>
	state.user.entities[id];

export const selectUserState = (state: RootState) => state.user;

export default userSlice;
