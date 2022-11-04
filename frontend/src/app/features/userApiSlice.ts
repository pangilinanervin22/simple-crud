import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { Users, UsersFetch } from "../../types";
import { RootState } from "../store";
import { apiSlice } from "../api/apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		// getRandom: builder.query({
		// 	query: () => "/random",
		// }),
		// postRandom: builder.mutation({
		// 	query: (initialPost) => ({
		// 		url: "/random",
		// 		method: "POST",
		// 		body: initialPost,
		// 	}),
		// }),
		// getUsers: builder.query({
		// 	query: () => "api/users",
		// 	providesTags: ["User"],
		// }),
		// getUserById: builder.query({
		// 	query: (postId) => "api/users/" + postId,
		// 	providesTags: ["User"],
		// }),
		// updateUser: builder.mutation({
		// 	query: (initialPost) => ({
		// 		url: `api/users/${initialPost._id}`,
		// 		method: "PUT",
		// 		body: {
		// 			...initialPost,
		// 		},
		// 		invalidatesTags: ["User"],
		// 	}),
		// }),
		// addUser: builder.mutation({
		// 	query: (initialPost) => ({
		// 		url: "api/users",
		// 		method: "POST",
		// 		body: initialPost,
		// 	}),
		// 	invalidatesTags: ["User"],
		// 	transformResponse: (data: UsersFetch) => {
		// 		return data;
		// 	},
		// }),
		// deleteMovie: builder.mutation({
		// 	query: (_id) => ({
		// 		url: `api/users/${_id}`,
		// 		method: "Delete",
		// 	}),
		// 	invalidatesTags: ["User"],
		// }),
	}),
});

// export const {
// 	useGetUsersQuery,
// 	useGetUserByIdQuery,
// 	useAddUserMutation,
// 	useGetRandomQuery,
// 	usePostRandomMutation,
// 	useDeleteMovieMutation,
// 	useUpdateUserMutation,
// } = userApiSlice;

// export const userStatus = (state: RootState) => state.user.status;
// export const userById = (state: RootState, id: string) =>
// 	state.user.entities[id];

// export const selectUserState = (state: RootState) => state.user;

export default userApiSlice;
