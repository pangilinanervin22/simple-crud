import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { UsersFetch } from "@root/types";
import { RootState } from "../store";

export const apiSlice = createApi({
	reducerPath: "apiUser",
	baseQuery: fetchBaseQuery({
		baseUrl: "https://simple-crud-alpha.vercel.app/api",
	}),
	tagTypes: ["Users"],
	endpoints: (builder) => ({
		getUsers: builder.query({
			query: () => "/users",
			providesTags: ["Users"],
		}),
		getUserById: builder.query({
			query: (postId) => "/users/" + postId,
			providesTags: ["Users"],
		}),
		updateUser: builder.mutation({
			query: (initialPost) => ({
				url: `/users/${initialPost._id}`,
				method: "PUT",
				body: initialPost,
			}),
			invalidatesTags: ["Users"],
		}),
		addUser: builder.mutation({
			query: (initialPost) => ({
				url: "/users",
				method: "POST",
				body: initialPost,
			}),
			transformResponse: (data: UsersFetch) => {
				return data;
			},
			invalidatesTags: ["Users"],
		}),
		deleteUser: builder.mutation({
			query: (_id) => ({
				url: `/users/${_id}`,
				method: "Delete",
			}),
			invalidatesTags: ["Users"],
		}),
		deleteManyUser: builder.mutation({
			query: (body) => ({
				url: `/users/many/`,
				method: "Delete",
				body: body,
			}),
			invalidatesTags: ["Users"],
		}),
	}),
});

export const {
	useGetUsersQuery,
	useGetUserByIdQuery,
	useAddUserMutation,
	useDeleteUserMutation,
	useUpdateUserMutation,
	useDeleteManyUserMutation,
} = apiSlice;

export const selectUserState = (state: RootState) => state.user;

export default apiSlice;
