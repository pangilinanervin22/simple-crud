import express from "express";
import movieController from "../controller/movieController";
import asyncHandle from "../middleware/asyncHandleError";
import testMid from "../middleware/test";
export const router = express.Router();

router.get("/", [testMid], asyncHandle(movieController.getAllMovies));
router.post("/", asyncHandle(movieController.postMovie));

router
	.route("/:id")
	.get(asyncHandle(movieController.getMovieById))
	.put(asyncHandle(movieController.updateMovieById))
	.delete(asyncHandle(movieController.deleteMovieById));

router.post("/:title/:genre", movieController.updateMovieByParams);
