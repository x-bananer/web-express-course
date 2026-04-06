import express from "express";
import { body } from "express-validator";

import {
	getUsers,
	getUserById,
	postUser,
	putUser,
	deleteUser,
} from "../controllers/user-controller.js";
import { validationErrors } from "../../middlewares/error-handlers.js";
import { authenticateToken } from "../../middlewares/authentication.js";

const userRouter = express.Router();

userRouter.route("/").get(getUsers);
userRouter
	.route("/")
	.post(
		body("name").trim().isLength({ min: 3, max: 50 }),
		body("username").trim().isLength({ min: 3, max: 20 }).isAlphanumeric(),
		body("email").trim().isEmail(),
		body("password").trim().isLength({ min: 8 }),
		validationErrors,
		postUser,
	);

userRouter.route("/:id").get(getUserById);
userRouter
	.route("/:id")
	.put(
		authenticateToken,
		body("name").optional().trim().isLength({ min: 3, max: 50 }),
		body("username")
			.optional()
			.trim()
			.isLength({ min: 3, max: 20 })
			.isAlphanumeric(),
		body("email").optional().trim().isEmail(),
		body("password").optional().trim().isLength({ min: 8 }),
		validationErrors,
		putUser,
	);
userRouter.route("/:id").delete(authenticateToken, deleteUser);

export default userRouter;
