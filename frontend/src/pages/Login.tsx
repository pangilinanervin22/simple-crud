import { Grid, TextField } from "@mui/material";
import { RootState } from "../app/store";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
	useGetUserByIdQuery,
	useGetUsersQuery,
	useUpdateUserMutation,
} from "../app/api/apiSlice";
import { useState } from "react";
import { Users } from "@root/types";

export default function Login() {
	const { data, isSuccess, refetch, isFetching } = useGetUserByIdQuery(
		"634ad6c4415cc4dc25f0a177"
	);

	const { data: all, isSuccess: allSuccess } = useGetUsersQuery("");
	const [first, setfirst] = useState(19);
	const [updatePost, result] = useUpdateUserMutation();

	// if ((isSuccess, result.isSuccess)) console.log(data.age, result.data?.age);

	if (isSuccess) console.log(data?.age, result.data?.age);
	console.log(isFetching, "wew");

	return (
		<>
			<h1> Testing ground for MUI </h1>
			<p>
				{isSuccess ? JSON.stringify(data) : ""}
				{allSuccess
					? JSON.stringify(
							all.find(
								(item: any) =>
									item._id == "634ad56012f79e18e6ec2c4d"
							)
					  )
					: ""}
				{allSuccess
					? JSON.stringify(
							all.find(
								(item: any) =>
									item._id == "63495e3abfe09a14f2f37ec8"
							)
					  )
					: ""}
			</p>

			<button
				onClick={() => {
					setfirst(first + 1);
					updatePost({
						_id: "634ad6c4415cc4dc25f0a177",
						name: "Aaron Emerald",
						age: first,
						position: "Director",
						gender: "Male",
					});
				}}
			>
				Update eme
			</button>

			<button
				onClick={() => {
					refetch();
				}}
			>
				Refetch
			</button>

			<Grid container columns={{ xs: 18, sm: 16, md: 12 }}>
				<Grid item xs={6} sm={8} md={4} bgcolor="red">
					1st
				</Grid>
				<Grid item xs={4} sm={6} md={4} bgcolor="blue">
					2nd
				</Grid>
				<Grid xs={8} sm={2} md={4} item bgcolor="green">
					3rd
				</Grid>
			</Grid>
			<Grid container>
				<Grid item xs={4} bgcolor="red">
					1st
				</Grid>
				<Grid item xs={4} bgcolor="blue">
					2nd
				</Grid>
				<Grid xs={4} item bgcolor="green">
					3rd
				</Grid>
			</Grid>
			<TextField label="Sample" sx={{ mt: 5 }}></TextField>
		</>
	);
}
