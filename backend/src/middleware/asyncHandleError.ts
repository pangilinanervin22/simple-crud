import { NextFunction, Request, Response } from "express";

export function asyncHandle(handler: Function) {
	return async function (req: Request, res: Response, next: NextFunction) {
		try {
			await handler(req, res, next);
		} catch (ex) {
			next(ex);
		}
	};
}
const use = (fn: Function) => (req: Request, res: Response, next: NextFunction) =>
	Promise.resolve(fn(req, res, next)).catch(next);

export default asyncHandle;
