import { User, validateUser } from "../model/userModel";
import { Request, Response } from "express";

export default {
	//get data
	async getAllUsers(req: Request, res: Response) {
		const temp = await User.find().sort({ name: 1 });

		res.send(temp);
	},

	async getUserById(req: Request, res: Response) {
		const user = await User.findOne({
			_id: req.params.id,
		});

		if (!user)
			return res
				.status(404)
				.send("The genre with the given ID was not found.");

		console.log(user.get("name"), user?.generateToken());

		res.send(user);
	},

	// post data
	async postUser(req: Request, res: Response) {
		const { error } = validateUser(req.body);
		console.log("error :", error);
		if (error) return res.status(400).send(error.details[0].message);

		const user = new User({ ...req.body });

		console.log(await user.save());

		res.send(await user.save());
	},

	//delete data
	async deleteUserById(req: Request, res: Response) {
		const temp = await User.findByIdAndDelete(req.params.id);
		if (!temp)
			return res
				.status(404)
				.send("The genre with the given ID was not found.");

		res.send(temp);
	},

	//update data
	async updateUserById(req: Request, res: Response) {
		console.log(req.body);
		const { error } = validateUser(req.body);

		console.log("error :", error);
		if (error) return res.status(400).send(error.details[0].message);

		const user = await User.findByIdAndUpdate(req.params.id, {
			name: req.params.name,
			age: Number(req.params.age),
			gender: req.params.gender,
			position: req.params.position,
		});

		if (!user)
			return res
				.status(404)
				.send("The genre with the given ID was not found.");

		res.send(user);
	},

	async updateUserByParams(req: Request, res: Response) {
		console.log(req.params);
		const { error } = validateUser({
			name: req.params.name,
			age: Number(req.params.age),
			gender: req.params.gender,
			position: req.params.position,
		});

		if (error) return res.status(400).send(error.details[0].message);

		const user = new User({
			name: req.params.name,
			age: Number(req.params.age),
			gender: req.params.gender,
			position: req.params.position,
		});

		res.send(await user.save());
	},
};
