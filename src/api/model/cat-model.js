import promisePool from "../../utils/database.js";

const listCats = async () => {
	const [rows] = await promisePool.query(`
		SELECT wsk_cats.*, wsk_users.name AS owner_name
		FROM wsk_cats
		LEFT JOIN wsk_users ON wsk_cats.owner = wsk_users.user_id
	`);
	console.log("rows", rows);
	return rows;
};

const findCatById = async (catId) => {
	const [rows] = await promisePool.execute(
		`
		SELECT wsk_cats.*, wsk_users.name AS owner_name
		FROM wsk_cats
		LEFT JOIN wsk_users ON wsk_cats.owner = wsk_users.user_id
		WHERE wsk_cats.cat_id = ?
	`,
		[catId],
	);
	console.log("rows", rows);
	if (rows.length === 0) {
		return false;
	}
	return rows[0];
};

const findCatsByUserId = async (userId) => {
	const [rows] = await promisePool.execute(
		`
		SELECT wsk_cats.*, wsk_users.name AS owner_name
		FROM wsk_cats
		LEFT JOIN wsk_users ON wsk_cats.owner = wsk_users.user_id
		WHERE wsk_cats.owner = ?
	`,
		[userId],
	);
	return rows;
};

const addCat = async (cat) => {
	const { cat_name, weight, owner, filename, birthdate } = cat;
	const sql = `INSERT INTO wsk_cats (cat_name, weight, owner, filename, birthdate) VALUES (?, ?, ?, ?, ?)`;
	const params = [cat_name, weight, owner, filename, birthdate];
	const [result] = await promisePool.execute(sql, params);
	console.log("result", result);

	if (result.affectedRows === 0) {
		return false;
	}

	return { cat_id: result.insertId };
};

const updateCat = async (updatedCat, user) => {
	const { cat_id, ...cat } = updatedCat;
	let sql;

	if (user.role === "admin") {
		sql = promisePool.format(`UPDATE wsk_cats SET ? WHERE cat_id = ?`, [
			cat,
			cat_id,
		]);
	} else {
		sql = promisePool.format(
			`UPDATE wsk_cats SET ? WHERE cat_id = ? AND owner = ?`,
			[cat, cat_id, user.user_id],
		);
	}

	const [result] = await promisePool.execute(sql);
	console.log("result", result);
	if (result.affectedRows === 0) {
		return false;
	}
	return { message: "success" };
};

const removeCat = async (catId, user) => {
	let sql;
	let params;

	if (user.role === "admin") {
		sql = "DELETE FROM wsk_cats WHERE cat_id = ?";
		params = [catId];
	} else {
		sql = "DELETE FROM wsk_cats WHERE cat_id = ? AND owner = ?";
		params = [catId, user.user_id];
	}

	const [rows] = await promisePool.execute(sql, params);
	console.log("rows", rows);
	if (rows.affectedRows === 0) {
		return false;
	}
	return { message: "success" };
};

export {
	listCats,
	findCatById,
	findCatsByUserId,
	addCat,
	updateCat,
	removeCat,
};
