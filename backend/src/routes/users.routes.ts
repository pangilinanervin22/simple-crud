import express from "express";
import userController from "../controller/userController";
import asyncHandle from "../middleware/asyncHandleError";
import testMid from "../middleware/test";
export const router = express.Router();

router.get("/", [testMid], asyncHandle(userController.getAllUsers));
router.post("/", asyncHandle(userController.postUser));
router.delete("/many", asyncHandle(userController.deleteManyUsers));

router
	.route("/:id")
	.get(asyncHandle(userController.getUserById))
	.put(asyncHandle(userController.updateUserById))
	.delete(asyncHandle(userController.deleteUserById));
