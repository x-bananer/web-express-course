import express from "express";

import {
	getUsers,
	getUserById,
	postUser,
	putUser,
	deleteUser,
} from "../controllers/user-controller.js";

const userRouter = express.Router();

userRouter.route("/").get(getUsers);
userRouter.route("/").post(postUser);

userRouter.route("/:id").get(getUserById);
userRouter.route("/:id").put(putUser);
userRouter.route("/:id").delete(deleteUser);

export default userRouter;
