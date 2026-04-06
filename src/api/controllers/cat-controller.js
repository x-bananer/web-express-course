import {
	addCat,
	findCatById,
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

// create
const postCat = async (req, res) => {
	console.log(req.file);
	console.log(req.body);

	const result = await addCat({
		...req.body,
		filename: req.file ? req.file.filename : null,
	});

	if (result.id) {
		res.status(201).json({ message: "New cat added.", result });
	} else {
		res.sendStatus(400);
	}
};

// update
const putCat = async (req, res) => {
	const updatedCat = await updateCat({
		id: Number(req.params.id),
		...req.body,
		...(req.file ? { filename: req.file.filename } : {}),
	});

	if (updatedCat) {
		res.json({ message: "Cat updated.", updatedCat });
	} else {
		res.sendStatus(404);
	}
};

const deleteCat = async (req, res) => {
	const deletedCat = await removeCat(Number(req.params.id));

	if (deletedCat) {
		res.json({ message: "Cat deleted.", deletedCat });
	} else {
		res.sendStatus(404);
	}
};

export { deleteCat, getCats, getCatById, postCat, putCat };
