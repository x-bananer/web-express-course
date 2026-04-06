import {
	addCat,
	findCatById,
	listCats,
	removeCat,
	updateCat,
} from "../model/cat-model.js";

const getCats = (req, res) => {
	res.json(listCats());
};

const getCatById = (req, res) => {
	const cat = findCatById(Number(req.params.id));

	if (cat) {
		res.json(cat);
	} else {
		res.sendStatus(404);
	}
};

// create
const postCat = (req, res) => {
	console.log(req.file);
	console.log(req.body);

	const result = addCat({
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
const putCat = (req, res) => {
	const updatedCat = updateCat({
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

const deleteCat = (req, res) => {
	const deletedCat = removeCat(Number(req.params.id));

	if (deletedCat) {
		res.json({ message: "Cat deleted.", deletedCat });
	} else {
		res.sendStatus(404);
	}
};

export { deleteCat, getCats, getCatById, postCat, putCat };
