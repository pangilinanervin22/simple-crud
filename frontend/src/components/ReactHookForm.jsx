import { Typography, Button, TextField } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";

const schema = Joi.object({
	UserName: Joi.string()
		.email({ tlds: false })
		.min(8)
		.max(40)
		.required()
		.messages({
			"string.min": `{#label} should have a minimum length of {#limit}`,
			"string.max": `{#label} should have a maximum length of {#limit}`,
			"any.required": `{#label} is a required field`,
		}),
	Password: Joi.string().min(5).max(40).required().messages({
		"string.min": `{#label} should have a minimum length of {#limit}`,
		"string.max": `{#label} should have a maximum length of {#limit}`,
		"any.required": `{#label} is a required field`,
	}),
});

export default function ReactHookForm() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: { UserName: "", Password: "" },
		resolver: joiResolver(schema),
	});

	const onSubmit = (data) => console.log(data);

	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)} className="login_form ">
				<div className="form_group">
					<Typography variant="h3" align="center" display="block">
						Login
					</Typography>
					<TextField
						required
						type="text"
						label="UserName"
						helperText={errors.UserName?.message}
						error={errors.UserName?.message}
						{...register("UserName")}
						sx={{ mb: "30px" }}
					/>
					<TextField
						required
						type="password"
						label="Password"
						minLength="3"
						helperText={errors.Password?.message}
						error={errors.Password?.message}
						{...register("Password")}
						sx={{ mb: "30px" }}
					/>
					<Button
						type="submit"
						variant="contained"
						color="primary"
						sx={{
							background: "dodgerblue",
							width: "20%",
							ml: "auto",
						}}
					>
						Submit
					</Button>
				</div>
			</form>
		</>
	);
}
