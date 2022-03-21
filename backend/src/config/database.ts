import mongoose from "mongoose";

const path: any = process.env.DATABASE_PATH;

export async function connectMongoDB() {
	await mongoose
		.connect(path)
		.then(() => console.log("Connected to MongoDB..."))
		.catch(() => console.error("Failed connection..."));
}
