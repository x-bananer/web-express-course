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
	const result = await addUser(req.body);

	if (result.id) {
		res.status(201).json({ message: "New user added.", result });
	} else {
		res.sendStatus(400);
	}
};

// update
const putUser = async (req, res) => {
	const updatedUser = await updateUser({
		id: Number(req.params.id),
		...req.body,
	});

	if (updatedUser) {
		res.json({ message: "User updated.", updatedUser });
	} else {
		res.sendStatus(404);
	}
};

const deleteUser = async (req, res) => {
	const deletedUser = await removeUser(Number(req.params.id));

	if (deletedUser) {
		res.json({ message: "User deleted.", deletedUser });
	} else {
		res.sendStatus(404);
	}
};

export { deleteUser, getUsers, getUserById, postUser, putUser };
