import {
	DialogTitle,
	Dialog,
	DialogContent,
	TextField,
	DialogActions,
	Button,
	Box,
	Grid,
	MenuItem,
} from "@mui/material";

import Joi from "joi";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { showNotification } from "../app/features/notificationSlice";
import {
	useAddUserMutation,
	useGetUserByIdQuery,
	useUpdateUserMutation,
} from "../app/api/apiSlice";

const schema = Joi.object({
	name: Joi.string().min(3).max(40).required().messages({
		"string.min": `{#label} should have a minimum length of {#limit}`,
		"string.max": `{#label} should have a maximum length of {#limit}`,
		"any.required": `{#label} is a required field`,
	}),
	age: Joi.number().min(18).max(100).required().messages({
		"string.min": `{#label} should have a minimum length of {#limit}`,
		"string.max": `{#label} should have a maximum length of {#limit}`,
		"any.required": `{#label} is a required field`,
	}),
	gender: Joi.string().valid("Male", "Female", "Others").required().messages({
		"string.valid": `{#label} should have only ["Male", "Female", "Others"]`,
		"any.required": `{#label} is a required field`,
	}),
	position: Joi.string().min(5).max(40).required().messages({
		"string.min": `{#label} should have a minimum length of {#limit}`,
		"string.max": `{#label} should have a maximum length of {#limit}`,
		"any.required": `{#label} is a required field`,
	}),
});

export default function UserEditFetch() {
	const dispatch = useDispatch();
	const redirect = useNavigate();
	const [isOpen, setIsOpen] = useState(true);
	const { id: paramsId } = useParams<{ id: string }>();

	const par = useParams();
	console.log(par);

	const { data, isSuccess, isLoading } = useGetUserByIdQuery(paramsId!);
	const currentObject: any = !data || paramsId === "new" ? {} : data;
	const [addUser] = useAddUserMutation();
	const [updateUser, { isError, error: wew }] = useUpdateUserMutation();

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm({
		resolver: joiResolver(schema),
	});

	const onSubmit = (formData: any) => {
		console.log("submit");

		handleOpenDialog();

		if (!currentObject || paramsId === "new") addUser({ ...formData });
		else updateUser({ ...formData, _id: paramsId });

		dispatch(
			showNotification({
				message:
					paramsId === "new"
						? "Successfully added new Data"
						: "Successfully update " + formData.name,
				variant: "success",
			})
		);
	};

	useEffect(() => {
		for (const key in currentObject) {
			if (key == "_id" || key == "__v") continue;

			setValue(key, currentObject[key]);
		}
	}, [isSuccess]);

	// console.log(isOpen && isSuccess);
	console.log("render", wew, isError);

	return (
		<>
			<Dialog
				open={isOpen && !isLoading}
				onClose={() => {}}
				maxWidth="lg"
			>
				<DialogTitle>
					{paramsId == "new" ? "Add new movie" : "Edit movie"}
				</DialogTitle>
				<DialogContent sx={{ margin: "20px" }}>
					<form onSubmit={handleSubmit(onSubmit)}>
						<Box
							sx={{
								display: "flex",
								flexDirection: "column",
								width: "600px",
							}}
						>
							<Grid container spacing={4}>
								<Grid item xs={7}>
									<TextField
										required
										type="text"
										label="Name"
										helperText={
											Boolean(errors.age?.message)
												? String(errors.name?.message)
												: ""
										}
										error={Boolean(errors.name?.message)}
										{...register("name")}
										fullWidth
										margin="normal"
									/>
								</Grid>
								<Grid item xs={5}>
									<TextField
										required
										type="number"
										label="Age"
										minLength="3"
										helperText={
											Boolean(errors.age?.message)
												? String(errors.age?.message)
												: ""
										}
										error={Boolean(errors.age?.message)}
										{...register("age")}
										fullWidth
										margin="normal"
									/>
								</Grid>
							</Grid>

							<TextField
								label="Gender"
								required
								select
								defaultValue={currentObject?.gender || ""}
								helperText={
									Boolean(errors.gender?.message)
										? String(errors.gender?.message)
										: ""
								}
								error={Boolean(errors.gender?.message)}
								{...register("gender")}
								margin="normal"
							>
								<MenuItem value="Male">Male</MenuItem>
								<MenuItem value="Female">Female</MenuItem>
								<MenuItem value="Others">Others</MenuItem>
							</TextField>

							<TextField
								required
								type="text"
								label="Position"
								minLength="3"
								helperText={
									Boolean(errors.position?.message)
										? String(errors.position?.message)
										: ""
								}
								error={Boolean(errors.position?.message)}
								{...register("position")}
								margin="normal"
							/>

							<DialogActions
								sx={{
									display: "flex",
									justifyContent: "flex-end",
								}}
							>
								<Button
									type="submit"
									variant="contained"
									color="secondary"
									sx={{
										width: "20%",
										margin: "3px",
									}}
								>
									Submit
								</Button>
								<Button
									variant="contained"
									color="primary"
									sx={{
										background: "dodgerblue",
										width: "20%",
										margin: "3px",
									}}
									onClick={handleOpenDialog}
								>
									Cancel
								</Button>
							</DialogActions>
						</Box>
					</form>
				</DialogContent>
			</Dialog>
		</>
	);

	function handleOpenDialog() {
		setIsOpen(false);
		redirect("../", { replace: true });
	}
}
