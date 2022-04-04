import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import _ from "lodash";

export default function FormikSample(props) {
	let index = 0;
	return (
		<>
			{console.log(props.data._id)}
			{props.isVisible ? (
				<Formik
					initialValues={{
						title: props.data.title,
						genre: props.data.genre,
					}}
					validationSchema={schemaYup}
					onSubmit={(values) => {
						if (props.data._id) {
							props.handleSubmit(
								{ ...values, _id: props.data._id },
								true
							);
						} else props.handleSubmit(values, false);
					}}
				>
					{(formik) => (
						<div className="modal_form">
							{console.log(index++, isFalsy(formik.values))}
							{console.log()}
							<form
								onSubmit={formik.handleSubmit}
								className="login_form "
							>
								<div className="form_group">
									<label htmlFor="title">Title</label>
									<input
										id="title"
										type="text"
										className="input"
										minLength="3"
										{...formik.getFieldProps("title")}
									/>
									{formik.touched.title &&
									formik.errors.title ? (
										<div className="error_msg">
											{formik.errors.title}
										</div>
									) : null}
								</div>
								<div className="form_group">
									<label htmlFor="genre">Genre</label>
									<input
										id="genre"
										type="text"
										className="input"
										minLength="3"
										{...formik.getFieldProps("genre")}
									/>
									{formik.touched.genre &&
									formik.errors.genre ? (
										<div className="error_msg">
											{formik.errors.genre}
										</div>
									) : null}
								</div>
								<div>
									<button
										type="submit"
										className={"btn_submit"}
									>
										Submit
									</button>
									<button
										onClick={props.handelCancel}
										className="btn_submit"
									>
										cancel
									</button>
								</div>
							</form>
						</div>
					)}
				</Formik>
			) : null}
		</>
	);

	function submitButtonDisable() {
		return _.isEqual(formik.values, _.pick(props.data, ["title", "genre"]));
	}

	function isFalsy(obj) {
		return Object.values(obj).every((value) => {
			if (!value) {
				return true;
			}
			return false;
		});
	}

	function buttonDesign(val) {
		if (val) return "error_button";
	}
}

const schemaYup = Yup.object({
	title: Yup.string()
		.min(3, "Must be 3 to 25 ")
		.max(25, "Must be 3 to 25 ")
		.required("Required"),
	genre: Yup.string()
		.min(3, "Must be 3 to 25 ")
		.max(25, "Must be 3 to 25 ")
		.required("Required"),
});

// <Form className="login_form ">
// 	<h3>Formik Sample</h3>
// 	<div className="form_group">
// 		<label htmlFor="title" className="label">
// 			Title
// 		</label>
// 		<Field
// 			name="title"
// 			type="text"
// 			className="input"
// 		/>
// 		<ErrorMessage
// 			name="title"
// 			component="span"
// 			className="error_msg"
// 		/>
// 	</div>

// 	<div className="form_group">
// 		<label htmlFor="genre" className="label">
// 			Genre
// 		</label>
// 		<Field
// 			name="genre"
// 			type="genre"
// 			className="input"
// 		/>
// 		<ErrorMessage
// 			name="genre"
// 			component="span"
// 			className="error_msg"
// 		/>
// 	</div>
// 	<div>
// 		<button
// 			type="submit"
// 			className="btn_submit "
// 		>
// 			Submit
// 		</button>
// 		<button
// 			onClick={props.handelCancel}
// 			className={schemaYup.validate()}
// 		>
// 			cancel
// 		</button>
// 	</div>
// </Form>
