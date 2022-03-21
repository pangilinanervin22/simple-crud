import { NextFunction, Request, Response } from "express";

export function authAdmin(req: Request, res: Response, next: NextFunction) {
	const token = req.header("isAdmin");
	console.log(req.header("token"));

	if (!token || token === "false") return res.status(403).send("Access denied");

	next();
}
