// Mock data
const users = [
	{
		id: 3609,
		name: 'John Doe',
		username: 'johndoe',
		email: 'john@metropolia.fi',
		role: 'user',
		password: 'password',
	},
];

const listUsers = () => {
	return users;
};

const findUserById = (id) => {
	return users.find((user) => user.id === id);
};

const addUser = (user) => {
	const { name, username, email, role, password } = user;

	const newId = users[0].id + 1;
	const newUser = {
		id: newId,
		name,
		username,
		email,
		role,
		password,
	};

	users.unshift(newUser);

	return newUser;
};

const updateUser = (updatedUser) => {
	const index = users.findIndex((user) => user.id === updatedUser.id);

	if (index === -1) {
		return null;
	}

	const existingUser = users[index];
	const newUser = {
		...existingUser,
		...updatedUser,
		id: existingUser.id,
	};

	users[index] = newUser;

	return newUser;
};

const removeUser = (id) => {
	const index = users.findIndex((user) => user.id === id);

	if (index === -1) {
		return null;
	}

	const [deletedUser] = users.splice(index, 1);
	return deletedUser;
};

export { listUsers, findUserById, addUser, updateUser, removeUser };
