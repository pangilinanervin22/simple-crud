import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const sampleApiSlice = createApi({
	reducerPath: "sampleApi",
	baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/" }),
	tagTypes: ["Movies"],

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
		getMovie: builder.query({
			query: (postId) => "api/movies/" + postId,
		}),
		getMovies: builder.query({
			query: () => "/movies",
			providesTags: ["Movies"],
		}),
		addMovies: builder.mutation({
			query: (initialPost) => ({
				url: "/movies",
				method: "POST",
				body: initialPost,
			}),
			invalidatesTags: ["Movies"],
		}),
		deleteMovies: builder.mutation({
			query: (id) => ({
				url: `/movies/${id}`,
				method: "Delete",
			}),
			invalidatesTags: ["Movies"],
		}),
	}),
});

export const {
	useGetMoviesQuery,
	useAddMoviesMutation,
	useGetRandomQuery,
	usePostRandomMutation,
	useDeleteMoviesMutation,
	useGetMovieQuery,
} = sampleApiSlice;
