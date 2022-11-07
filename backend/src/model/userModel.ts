import Joi, { number } from "Joi";
import mongoose, { model, Model, Schema } from "mongoose";

export interface IUser {
	name: string;
	age: number;
	gender: string;
	position: string;
	isAdmin?: boolean;
}

interface IUserMethod {
	generateToken(): string;
}

type IMoviesModel = Model<IUser, {}, IUserMethod>;

const UserSchema: Schema<IUser> = new Schema({
	name: {
		type: String,
		required: [true, "Why title?"],
		minlength: 3,
		maxlength: 50,
	},
	age: {
		type: Number,
		required: true,
		min: 18,
		max: 65,
	},
	gender: {
		type: String,
	},
	position: {
		type: String,
		minlength: 5,
		maxlength: 50,
	},
});

UserSchema.methods.generateToken = function () {
	return this._id;
};

export const User = model<IUser, IMoviesModel>("User", UserSchema);

export function validateUser(user: IUser) {
	const schema = Joi.object({
		name: Joi.string().min(3).max(50).required(),
		gender: Joi.string().min(3).max(20).required(),
		age: Joi.number().min(18).max(99).required(),
		position: Joi.string().min(5).max(50).required(),
		isAdmin: Joi.boolean(),
		_id: Joi.string(),
	});

	return schema.validate(user);
}
