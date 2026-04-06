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

const getUserById = async (req, res) => {
	const user = await findUserById(Number(req.params.id));

	if (user) {
		res.json(user);
	} else {
		res.sendStatus(404);
	}
};

// create
const postUser = async (req, res) => {
	const result = await addUser({
		...req.body,
		password: bcrypt.hashSync(req.body.password, 10),
	});

	if (result.user_id) {
		res.status(201).json({ message: "New user added.", result });
	} else {
		res.sendStatus(400);
	}
};

// update
const putUser = async (req, res) => {
	if (
		res.locals.user.user_id !== Number(req.params.id) &&
		res.locals.user.role !== "admin"
	) {
		return res.sendStatus(403);
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
		res.sendStatus(404);
	}
};

const deleteUser = async (req, res) => {
	if (
		res.locals.user.user_id !== Number(req.params.id) &&
		res.locals.user.role !== "admin"
	) {
		return res.sendStatus(403);
	}

	const deletedUser = await removeUser(Number(req.params.id));

	if (deletedUser) {
		res.json({ message: "User deleted.", deletedUser });
	} else {
		res.sendStatus(404);
	}
};

export { deleteUser, getUsers, getUserById, postUser, putUser };
