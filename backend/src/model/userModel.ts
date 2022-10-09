import Joi, { number } from "Joi";
import mongoose, { Model, Schema } from "mongoose";

export interface IMovies {
	title: string;
	genre: string;
}

const UserSchema: Schema = new Schema({
	name: {
		type: String,
		required: [true, "Why title?"],
		minlength: 3,
		maxlength: 50,
	},
	age: {
		type: number,
		required: true,
		min: 18,
		max: 50,
	},
	gender: {
		type: String,
	},
	position: {
		type: Boolean,
	},
});

UserSchema.methods.generateToken = function () {
	return { id: "Token " + this._id, title: this.title, genre: this.genre };
};

// MovieSchema.path("title").get(function (v: any) {
// 	return "title: " + v;
// });

// MovieSchema.path("title").set(function (v: any) {
// 	return "title: " + v;
// });

// MovieSchema.eachPath(function (path) {
// 	console.log(path);
// });

export const Users = mongoose.model("User", UserSchema);

export function validateMovies(movie: IMovies) {
	const schema = Joi.object({
		title: Joi.string().min(3).max(50).required(),
		genre: Joi.string().min(3).max(20).required(),
		isAdmin: Joi.boolean(),
	});

	return schema.validate(movie);
}
