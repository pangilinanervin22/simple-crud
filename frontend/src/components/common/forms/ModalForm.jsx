import React from "react";
import Form from "./Form";
import Joi from "joi-browser";
import propTypes from "prop-types";
import style from "./styles.module.css";

class ModalForm extends Form {
	state = {
		data: { title: "", genre: "" },
		errors: {},
	};

	schema = {
		title: Joi.string().required().min(3).label("Title"),
		genre: Joi.string().required().min(3).label("Genre"),
		_id: Joi.string(),
	};

	componentDidMount() {
		const { _id, title, genre } = this.props.data;
		this.setState({ data: { _id, title, genre } });
	}

	doSubmit = () => {
		if (this.state.data._id) {
			this.props.handleSubmit(this.state.data, true);
		} else this.props.handleSubmit(this.state.data, false);
	};

	cancelSubmit = () => {
		this.props.handelCancel();
	};

	render() {
		return (
			<>
				{this.props.isVisible ? (
					<div className={style.modal_form}>
						<form
							onSubmit={this.handleSubmit}
							className={style.login_form}
						>
							<h2>Edit</h2>
							{this.renderInput("title", "Title", "text")}
							{this.renderInput("genre", "Genre", "text")}
							{this.renderButtonSubmit("save")}
							{this.renderButtonCancel(
								"cancel",
								this.cancelSubmit
							)}
						</form>
					</div>
				) : (
					" "
				)}
			</>
		);
	}
}

ModalForm.propTypes = {
	data: propTypes.object.isRequired,
};

ModalForm.defaultProps = {
	isVisible: true,
};

export default ModalForm;
