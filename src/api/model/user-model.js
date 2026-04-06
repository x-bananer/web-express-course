import promisePool from "../../utils/database.js";

const listUsers = async () => {
	const [rows] = await promisePool.query("SELECT * FROM wsk_users");
	return rows;
};

const findUserById = async (userId) => {
	const [rows] = await promisePool.execute(
		"SELECT * FROM wsk_users WHERE user_id = ?",
		[userId],
	);
	if (rows.length === 0) {
		return false;
	}
	return rows[0];
};

const findUserByUsername = async (username) => {
	const [rows] = await promisePool.execute(
		"SELECT * FROM wsk_users WHERE username = ?",
		[username],
	);
	if (rows.length === 0) {
		return false;
	}
	return rows[0];
};

const addUser = async (user) => {
	const { name, username, email, role, password } = user;
	const sql = `INSERT INTO wsk_users (name, username, email, role, password) VALUES (?, ?, ?, ?, ?)`;
	const params = [name, username, email, role, password];
	const [result] = await promisePool.execute(sql, params);

	if (result.affectedRows === 0) {
		return false;
	}

	return { user_id: result.insertId };
};

const updateUser = async (updatedUser) => {
	const { user_id, ...user } = updatedUser;
	const sql = promisePool.format(`UPDATE wsk_users SET ? WHERE user_id = ?`, [
		user,
		user_id,
	]);
	const [result] = await promisePool.execute(sql);
	if (result.affectedRows === 0) {
		return false;
	}
	return { message: "success" };
};

const removeUser = async (userId) => {
	const connection = await promisePool.getConnection();

	try {
		await connection.beginTransaction();
		await connection.execute("DELETE FROM wsk_cats WHERE owner = ?", [
			userId,
		]);

		const sql = connection.format(
			"DELETE FROM wsk_users WHERE user_id = ?",
			[userId],
		);
		const [result] = await connection.execute(sql);

		if (result.affectedRows === 0) {
			return {
				message: "User not deleted",
			};
		}

		await connection.commit();
		return {
			message: "User deleted",
		};
	} catch (error) {
		await connection.rollback();
		console.error("error", error.message);
		return {
			message: error.message,
		};
	} finally {
		connection.release();
	}
};

export {
	listUsers,
	findUserById,
	findUserByUsername,
	addUser,
	updateUser,
	removeUser,
};
