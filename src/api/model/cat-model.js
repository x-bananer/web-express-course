import promisePool from '../../utils/database.js';

const listCats = async () => {
	const [rows] = await promisePool.query('SELECT * FROM wsk_cats');
	console.log('rows', rows);
	return rows;
};

const findCatById = async (id) => {
	const [rows] = await promisePool.execute('SELECT * FROM wsk_cats WHERE id = ?', [id]);
	console.log('rows', rows);
	if (rows.length === 0) {
		return false;
	}
	return rows[0];
};

const addCat = async (cat) => {
	const { name, weight, owner_id, filename, birthdate } = cat;
	const sql = `INSERT INTO wsk_cats (name, weight, owner_id, filename, birthdate) VALUES (?, ?, ?, ?, ?)`;
	const params = [name, weight, owner_id, filename, birthdate];
	const rows = await promisePool.execute(sql, params);
	console.log('rows', rows);

	if (rows[0].affectedRows === 0) {
		return false;
	}

	return { id: rows[0].insertId };
};

const updateCat = async (updatedCat) => {
	const { id, ...cat } = updatedCat;
	const sql = promisePool.format(`UPDATE wsk_cats SET ? WHERE id = ?`, [cat, id]);
	const rows = await promisePool.execute(sql);
	console.log('rows', rows);
	if (rows[0].affectedRows === 0) {
		return false;
	}
	return { message: 'success' };
};

const removeCat = async (id) => {
	const [rows] = await promisePool.execute('DELETE FROM wsk_cats WHERE id = ?', [id]);
	console.log('rows', rows);
	if (rows.affectedRows === 0) {
		return false;
	}
	return { message: 'success' };
};

export { listCats, findCatById, addCat, updateCat, removeCat };
