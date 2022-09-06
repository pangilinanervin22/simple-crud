import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Button, TextField, Box, DialogActions } from "@mui/material";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import _ from "lodash";

export const schema = Joi.object({
	title: Joi.string().min(3).max(40).required().messages({
		"string.min": `{#label} should have a minimum length of {#limit}`,
		"string.max": `{#label} should have a maximum length of {#limit}`,
		"any.required": `{#label} is a required field`,
	}),
	genre: Joi.string().min(5).max(40).required().messages({
		"string.min": `{#label} should have a minimum length of {#limit}`,
		"string.max": `{#label} should have a maximum length of {#limit}`,
		"any.required": `{#label} is a required field`,
	}),
});

export default function MovieFormDialog({
	currentObject,
	handleOpenDialog,
	handleConfirmDialog,
	isOpen = false,
}) {
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm({
		resolver: joiResolver(schema),
	});

	const onSubmit = (data) => {
		handleConfirmDialog({
			...data,
			id: currentObject.id,
		});
		handleOpenDialog();
	};

	useEffect(() => {
		for (const key in _.pick(currentObject, ["title", "genre"]))
			setValue(key, currentObject[key]);
	}, [currentObject]);

	return (
		<>
			<Dialog open={isOpen} onClose={handleOpenDialog}>
				<DialogTitle>
					{currentObject.id ? "Edit movie" : "Add new movie"}
				</DialogTitle>
				<DialogContent>
					<form onSubmit={handleSubmit(onSubmit)}>
						<Box
							sx={{
								display: "flex",
								flexDirection: "column",
								width: "500px",
							}}
						>
							<TextField
								required
								type="text"
								label="Title"
								autoComplete="off"
								helperText={errors.title?.message}
								error={errors.title?.message}
								{...register("title")}
								margin="normal"
							/>
							<TextField
								required
								type="text"
								label="Genre"
								minLength="3"
								helperText={errors.genre?.message}
								error={errors.genre?.message}
								{...register("genre")}
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
}
