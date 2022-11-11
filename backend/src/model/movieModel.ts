import Joi from "joi";
import mongoose, { model, Model, Schema } from "mongoose";

export interface IMovies {
	title: string;
	genre: string;
	isAdmin?: boolean;
}

interface IMoviesMethods {
	generateToken(): object;
}

type IMoviesModel = Model<IMovies, {}, IMoviesMethods>;

const MovieSchema: Schema<IMovies, IMoviesModel> = new mongoose.Schema({
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
	return this._id;
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

export const Movies = model<IMovies, IMoviesModel>("Movies", MovieSchema);

export function validateMovies(movie: IMovies) {
	const schema = Joi.object({
		title: Joi.string().min(3).max(50).required(),
		genre: Joi.string().min(3).max(20).required(),
		isAdmin: Joi.boolean(),
		_id: Joi.string(),
	});

	return schema.validate(movie);
}
