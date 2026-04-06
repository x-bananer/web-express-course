import {
	addUser,
	findUserById,
	listUsers,
	removeUser,
	updateUser,
} from "../model/user-model.js";

const getUsers = (req, res) => {
	res.json(listUsers());
};

const getUserById = (req, res) => {
	const user = findUserById(Number(req.params.id));

	if (user) {
		res.json(user);
	} else {
		res.sendStatus(404);
	}
};

// create
const postUser = (req, res) => {
	const result = addUser(req.body);

	if (result.id) {
		res.status(201).json({ message: "New user added.", result });
	} else {
		res.sendStatus(400);
	}
};

// update
const putUser = (req, res) => {
	const updatedUser = updateUser({
		id: Number(req.params.id),
		...req.body,
	});

	if (updatedUser) {
		res.json({ message: "User updated.", updatedUser });
	} else {
		res.sendStatus(404);
	}
};

const deleteUser = (req, res) => {
	const deletedUser = removeUser(Number(req.params.id));

	if (deletedUser) {
		res.json({ message: "User deleted.", deletedUser });
	} else {
		res.sendStatus(404);
	}
};

export { deleteUser, getUsers, getUserById, postUser, putUser };
