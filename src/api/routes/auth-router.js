import express from "express";
import { body } from "express-validator";
import { getMe, postLogin } from "../controllers/auth-controller.js";
import { validationErrors } from "../../middlewares/error-handlers.js";
import { authenticateToken } from "../../middlewares/authentication.js";

const authRouter = express.Router();

authRouter
	.route("/login")
	.post(
		body("username").trim().notEmpty(),
		body("password").trim().notEmpty(),
		validationErrors,
		postLogin,
	);
authRouter.route("/me").get(authenticateToken, getMe);

export default authRouter;
