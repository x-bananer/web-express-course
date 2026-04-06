import express from "express";

import {
	getUsers,
	getUserById,
	postUser,
	putUser,
	deleteUser,
} from "../controllers/user-controller.js";
import { authenticateToken } from "../../middlewares/authentication.js";

const userRouter = express.Router();

userRouter.route("/").get(getUsers);
userRouter.route("/").post(postUser);

userRouter.route("/:id").get(getUserById);
userRouter.route("/:id").put(authenticateToken, putUser);
userRouter.route("/:id").delete(authenticateToken, deleteUser);

export default userRouter;
