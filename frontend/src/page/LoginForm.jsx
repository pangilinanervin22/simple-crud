// import { Button, Input, TextField, Typography } from "@mui/material";
// import React from "react";
// import { Formik } from "formik";
// import * as Yup from "yup";

// const schemaYup = Yup.object({
// 	username: Yup.string()
// 		.min(3, "Must be 3 to 50 ")
// 		.max(50, "Must be 3 to 50 ")
// 		.required("Required"),
// 	password: Yup.string()
// 		.min(3, "Must be 3 to 25 ")
// 		.max(25, "Must be 3 to 25 ")
// 		.required("Required"),
// });

// export default function LoginForm() {
// 	return (
// 		<>
// 			<Formik
// 				initialValues={{
// 					username: "",
// 					password: "",
// 				}}
// 				validationSchema={schemaYup}
// 				onSubmit={(values) => {
// 					if (props.data._id) {
// 						props.handleSubmit(
// 							{ ...values, _id: props.data._id },
// 							true
// 						);
// 					} else props.handleSubmit(values, false);
// 				}}
// 			>
// 				{(formik) => (
// 					<div className="modal_form">
// 						<form
// 							onSubmit={formik.handleSubmit}
// 							className="login_form"
// 							autoComplete="off"
// 						>
// 							<Typography
// 								variant="h3"
// 								align="center"
// 								display="block"
// 								gutterBottom
// 							>
// 								Login
// 							</Typography>

// 							<div className="form_group">
// 								<TextField
// 									required
// 									id="username"
// 									type="text"
// 									label="UserName"
// 									minLength="3"
// 									helperText={formik.errors.username}
// 									error={
// 										formik.touched.username &&
// 										formik.errors.username
// 									}
// 									{...formik.getFieldProps("username")}
// 								/>
// 							</div>
// 							<div className="form_group">
// 								<TextField
// 									required
// 									id="password"
// 									type="password"
// 									label="Password"
// 									helperText={formik.errors.password}
// 									error={
// 										formik.touched.password &&
// 										formik.errors.password
// 									}
// 									{...formik.getFieldProps("password")}
// 								/>
// 							</div>
// 							<div>
// 								<Button
// 									type="submit"
// 									variant="contained"
// 									color="primary"
// 									sx={{ background: "dodgerblue" }}
// 								>
// 									Submit
// 								</Button>
// 							</div>
// 						</form>
// 					</div>
// 				)}
// 			</Formik>
// 		</>
// 	);
// }
