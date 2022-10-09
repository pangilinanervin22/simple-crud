import { NextFunction, Request, Response } from "express";

function testMid(req: Request, res: Response, next: NextFunction) {
	console.log("middleware test");
	req.headers.token = "token ohh";
	next();
}

export default testMid;
