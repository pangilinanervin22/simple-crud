require("dotenv").config();

import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { connectMongoDB } from "./src/config/database";
import { router as main } from "./src/routes/main.routes";
import { router as moives } from "./src/routes/movies.routes";

const app: Application = express();

//environment varibles

//usage
console.log(process.env.SAMPLE);
connectMongoDB();

app.set("view engine", "ejs");
app.set("views", "./src/public/views/");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());

app.use("/api/movies", moives);
app.use(main);

//this will catch errors from the middleware (asyncErrors)
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
	res.status(500).send(" SOMETHING FAILED " + err.name);
	console.log("catch error" + err.message);

	next();
});

const port = process.env.PORT || 3000;

if (app.get("env") === "development") app.use(morgan("tiny"));

app.listen(port, () => console.log(` Listening on port ${port}...`));
