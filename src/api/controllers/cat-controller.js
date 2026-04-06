import {
	addCat,
	findCatById,
	findCatsByUserId,
	listCats,
	removeCat,
	updateCat,
} from "../model/cat-model.js";

const getCats = async (req, res) => {
	const cats = await listCats();
	res.json(cats);
};

const getCatById = async (req, res) => {
	const cat = await findCatById(Number(req.params.id));

	if (cat) {
		res.json(cat);
	} else {
		res.sendStatus(404);
	}
};

const getCatsByUserId = async (req, res) => {
	const cats = await findCatsByUserId(Number(req.params.id));
	res.json(cats);
};

// create
const postCat = async (req, res) => {
	console.log(req.file);
	console.log(req.body);

	const result = await addCat({
		...req.body,
		owner: res.locals.user.user_id,
		filename: req.file ? req.file.filename : null,
	});

	if (result.cat_id) {
		res.status(201).json({ message: "New cat added.", result });
	} else {
		res.sendStatus(400);
	}
};

// update
const putCat = async (req, res) => {
	const cat = await findCatById(Number(req.params.id));

	if (!cat) {
		return res.sendStatus(404);
	}

	if (
		res.locals.user.role !== "admin" &&
		cat.owner !== res.locals.user.user_id
	) {
		return res.sendStatus(403);
	}

	const updatedCat = await updateCat(
		{
			cat_id: Number(req.params.id),
			...req.body,
			...(req.file ? { filename: req.file.filename } : {}),
		},
		res.locals.user,
	);

	if (updatedCat) {
		res.json({ message: "Cat updated.", updatedCat });
	} else {
		res.sendStatus(403);
	}
};

const deleteCat = async (req, res) => {
	const cat = await findCatById(Number(req.params.id));

	if (!cat) {
		return res.sendStatus(404);
	}

	if (
		res.locals.user.role !== "admin" &&
		cat.owner !== res.locals.user.user_id
	) {
		return res.sendStatus(403);
	}

	const deletedCat = await removeCat(Number(req.params.id), res.locals.user);

	if (deletedCat) {
		res.json({ message: "Cat deleted.", deletedCat });
	} else {
		res.sendStatus(403);
	}
};

export { deleteCat, getCats, getCatById, getCatsByUserId, postCat, putCat };
