import Joi from "Joi";
import mongoose, { Model, Schema } from "mongoose";

export interface IMovies {
	title: string;
	genre: string;
}

const MovieSchema: Schema = new mongoose.Schema({
	title: {
		type: String,
		required: [true, "Why title?"],
		minlength: 3,
		maxlength: 50,
	},
	genre: {
		type: String,
		required: true,
		minlength: 3,
		maxlength: 50,
	},
	isAdmin: {
		type: Boolean,
	},
});

MovieSchema.methods.generateToken = function () {
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

export const Movies: Model<IMovies> = mongoose.model("Movies", MovieSchema);

export function validateMovies(movie: IMovies) {
	const schema = Joi.object({
		title: Joi.string().min(3).max(50).required(),
		genre: Joi.string().min(3).max(20).required(),
		isAdmin: Joi.boolean(),
	});

	return schema.validate(movie);
}
