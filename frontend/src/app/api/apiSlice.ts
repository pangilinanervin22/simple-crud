import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { UsersFetch } from "@root/types";
import { RootState } from "../store";

export const apiSlice = createApi({
	reducerPath: "apiUser",
	baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4000/api" }),
	tagTypes: ["User"],
	endpoints: (builder) => ({
		getRandom: builder.query({
			query: () => "/random",
		}),
		postRandom: builder.mutation({
			query: (initialPost) => ({
				url: "/random",
				method: "POST",
				body: initialPost,
			}),
		}),
		getUsers: builder.query({
			query: () => "/users",
			providesTags: ["User"],
		}),
		getUserById: builder.query({
			query: (postId) => "/users/" + postId,
			providesTags: ["User"],
		}),
		updateUser: builder.mutation({
			query: (initialPost) => ({
				url: `/users/${initialPost._id}`,
				method: "PUT",
				body: initialPost,
			}),
			invalidatesTags: ["User"],
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
			invalidatesTags: ["User"],
		}),
		deleteMovie: builder.mutation({
			query: (_id) => ({
				url: `/users/${_id}`,
				method: "Delete",
			}),
			invalidatesTags: ["User"],
		}),
	}),
});

export const {
	useGetUsersQuery,
	useGetUserByIdQuery,
	useAddUserMutation,
	useGetRandomQuery,
	usePostRandomMutation,
	useDeleteMovieMutation,
	useUpdateUserMutation,
} = apiSlice;

export const selectUserState = (state: RootState) => state.user;

export default apiSlice;
