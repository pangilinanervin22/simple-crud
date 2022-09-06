import { Component } from "react";
import Joi from "joi-browser";
import propTypes from "prop-types";
import style from "./styles.module.css";

export default class Form extends Component {
	renderInput(name, label, type = "text", defaultValue) {
		const { data, errors } = this.state;
		return (
			<FormInput
				handleChange={this.handleChange}
				name={name}
				label={label}
				type={type}
				value={data[name]}
				error={errors[name]}
				defaultValue={defaultValue}
			/>
		);
	}

	renderSelect(name, label, options) {
		const { data, errors } = this.state;
		return (
			<FormDropdown
				onChange={this.handleChange}
				options={options}
				label={label}
				name={name}
				value={data[name]}
				error={errors[name]}
			/>
		);
	}

	// one submit button only
	renderButtonSubmit(label, handleClick) {
		return (
			<button
				disabled={this.validate()}
				onSubmit={this.handleSubmit}
				className={`${style.btn_submit} ${this.buttonDesign(
					this.validate()
				)}`}
				onClick={handleClick}
			>
				{label}
			</button>
		);
	}

	renderButtonCancel(label, handleClick) {
		return (
			<button className={style.btn_submit} onClick={handleClick}>
				{label}
			</button>
		);
	}

	buttonDesign = (val) => {
		if (val) return style.error_button;
	};

	// doSubmit from  child
	handleSubmit = (context) => {
		context.preventDefault();

		const errors = this.validate();
		this.setState({ errors: errors || {} });
		if (errors) return;

		this.doSubmit();
	};

	handleChange = ({ currentTarget: input }) => {
		const errorMessage = this.validateProperty(input);
		const errors = { ...this.state.errors };
		//update the state errors
		if (errorMessage) errors[input.name] = errorMessage;
		else delete errors[input.name];

		this.setState({ errors });

		const data = { ...this.state.data };
		data[input.name] = input.value;
		this.setState({ data });
	};

	validate = () => {
		const options = { abortEarly: false };
		const { error } = Joi.validate(this.state.data, this.schema, options);
		if (!error) return null;

		const errors = {};
		for (let item of error.details) errors[item.path[0]] = item.message;

		return errors;
	};

	validateProperty = ({ name, value }) => {
		const obj = { [name]: value };
		const schema = { [name]: this.schema[name] };
		const { error } = Joi.validate(obj, schema);
		return error ? error.details[0].message : null;
	};
}

//Components for the form
// input component
const FormInput = ({
	value,
	handleChange,
	label,
	name,
	type,
	error,
	defaultValue,
}) => {
	return (
		<div className={style.form_group}>
			<label htmlFor={name} className={style.label}>
				{label}
			</label>
			<input
				id={name}
				name={name}
				type={type}
				value={value}
				onChange={handleChange}
				className={`${style.input} ${error ? style.input_error : " "}`}
				defaultValue={defaultValue}
			/>
			{error && <div className={style.error_msg}>{error}</div>}
		</div>
	);
};

FormInput.proTypes = {
	value: propTypes.string.isRequired,
	label: propTypes.string.isRequired,
	name: propTypes.string.isRequired,
	handleChange: propTypes.func.isRequired,
};

FormInput.defaultProps = {
	type: "text",
};

//Dropdown component
const FormDropdown = ({
	value,
	options,
	onChange,
	label,
	name,
	error,
	type,
}) => {
	return (
		<div className={style.form_group}>
			<label htmlFor={name} className={style.label}>
				{label}
			</label>
			<select
				id={name}
				name={name}
				type={type}
				value={value}
				onChange={(val) => onChange(val)}
				className={`${style.input} ${error ? style.input_error : " "}`}
			>
				<option value="" />
				{options.map((item) => (
					<option key={item} value={item}>
						{item}
					</option>
				))}
			</select>
			{error && <div className={style.error_msg}>{error}</div>}
		</div>
	);
};

FormDropdown.proTypes = {
	value: propTypes.any.isRequired,
	options: propTypes.array.isRequired,
	label: propTypes.string.isRequired,
	name: propTypes.string.isRequired,
	handleChange: propTypes.func.isRequired,
};

FormDropdown.defaultProps = {
	type: "text",
	options: ["first", "second"],
};
