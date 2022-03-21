import express, { Request, Response } from "express";
import asyncHandle from "../middleware/asyncHandleError";
import { Movies } from "./../model/movieModel";
export const router = express.Router();

router.get(
	"/home",
	asyncHandle(async (req: Request, res: Response) => {
		res.render("index.ejs", { name: "home" });
	})
);

router.get(
	"/home/:id",
	asyncHandle(async (req: Request, res: Response) => {
		const movie = await Movies.findById(req.params.id);
		if (!movie) return res.status(404).send("The genre with the given ID was not found.");

		res.render("index.ejs", { name: movie.title });
	})
);
