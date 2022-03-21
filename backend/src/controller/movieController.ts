import { Movies, validateMovies } from "../model/movieModel";
import { Request, Response } from "express";
import { log } from "console";

export default {
	//get data
	async getAllMovies(req: Request, res: Response) {
		const temp = await Movies.find().sort({ name: 1 }).select("title _id genre");

		res.send(temp);
	},

	async getMovieById(req: Request, res: Response) {
		const movie: any = await Movies.findOne({
			_id: req.params.id,
		});
		if (!movie) return res.status(404).send("The genre with the given ID was not found.");

		console.log(movie.get("title"));

		res.send(movie);
	},

	// post data
	async postMovie(req: Request, res: Response) {
		const { error } = validateMovies(req.body);
		console.log("error :", error);
		if (error) return res.status(400).send(error.details[0].message);

		const movie = new Movies({ ...req.body });

		console.log(await movie.save());

		res.send(await movie.save());
	},

	//delete data
	async deleteMovieById(req: Request, res: Response) {
		const temp = await Movies.findByIdAndDelete(req.params.id);
		if (!temp) return res.status(404).send("The genre with the given ID was not found.");

		res.send(temp);
	},

	//update data
	async updateMovieById(req: Request, res: Response) {
		console.log(req.body);
		const { error } = validateMovies(req.body);

		console.log("error :", error);
		if (error) return res.status(400).send(error.details[0].message);

		const movie = await Movies.findByIdAndUpdate(req.params.id, {
			title: req.body.title,
			genre: req.body.genre,
		});

		if (!movie) return res.status(404).send("The genre with the given ID was not found.");

		res.send(movie);
	},

	async updateMovieByParams(req: Request, res: Response) {
		console.log(req.params);
		const { error } = validateMovies({
			title: req.params.title,
			genre: req.params.genre,
		});
		if (error) return res.status(400).send(error.details[0].message);

		const movie = new Movies({
			title: req.params.title,
			genre: req.params.genre,
		});

		res.send(await movie.save());
	},
};
