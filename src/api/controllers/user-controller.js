import bcrypt from "bcrypt";
import {
	addUser,
	findUserById,
	listUsers,
	removeUser,
	updateUser,
} from "../model/user-model.js";

const getUsers = async (req, res) => {
	const users = await listUsers();
	res.json(users);
};

const getUserById = async (req, res, next) => {
	const user = await findUserById(Number(req.params.id));

	if (user) {
		res.json(user);
	} else {
		const error = new Error("User not found");
		error.status = 404;
		next(error);
	}
};

// create
const postUser = async (req, res, next) => {
	const result = await addUser({
		...req.body,
		password: bcrypt.hashSync(req.body.password, 10),
	});

	if (result.error) {
		return next(new Error(result.error));
	}

	res.status(201).json({ message: "New user added.", result });
};

// update
const putUser = async (req, res, next) => {
	if (
		res.locals.user.user_id !== Number(req.params.id) &&
		res.locals.user.role !== "admin"
	) {
		const error = new Error("Forbidden");
		error.status = 403;
		return next(error);
	}

	const userData = {
		user_id: Number(req.params.id),
		...req.body,
	};

	if (req.body.password) {
		userData.password = bcrypt.hashSync(req.body.password, 10);
	}

	const updatedUser = await updateUser({
		...userData,
	});

	if (updatedUser) {
		res.json({ message: "User updated.", updatedUser });
	} else {
		const error = new Error("User not updated");
		error.status = 404;
		next(error);
	}
};

const deleteUser = async (req, res, next) => {
	if (
		res.locals.user.user_id !== Number(req.params.id) &&
		res.locals.user.role !== "admin"
	) {
		const error = new Error("Forbidden");
		error.status = 403;
		return next(error);
	}

	const deletedUser = await removeUser(Number(req.params.id));

	if (deletedUser) {
		res.json({ message: "User deleted.", deletedUser });
	} else {
		const error = new Error("User not deleted");
		error.status = 404;
		next(error);
	}
};

export { deleteUser, getUsers, getUserById, postUser, putUser };
