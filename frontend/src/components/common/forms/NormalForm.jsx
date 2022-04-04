import React from "react";
import Form from "./Form";
import Joi from "joi-browser";
import propTypes from "prop-types";
import style from "./styles.module.css";

class NormalForm extends Form {
	// data and schema must have same structure
	// joi brower is needed
	state = {
		data: { username: "", password: "" },
		errors: {},
	};

	schema = {
		username: Joi.string().required().min(8).label("Username"),
		password: Joi.string().required().min(8).label("Password"),
	};

	//action for submit button higher order for handling submit
	doSubmit = () => {
		console.log("submited");
	};

	render() {
		return (
			<React.Fragment>
				<form onSubmit={this.handleSubmit} className={style.login_form}>
					<h1>Login</h1>
					{this.renderInput("username", "Username")}
					{this.renderInput("password", "Password", "password")}
					{this.renderSelect("gender", "Gender", ["male", "female", "others"])}

					{this.renderButtonSubmit("login")}
				</form>
			</React.Fragment>
		);
	}
}

NormalForm.propTypes = {
	data: propTypes.object.isRequired,
};

export default NormalForm;
