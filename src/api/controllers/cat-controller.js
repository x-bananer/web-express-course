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

const getCatById = async (req, res, next) => {
	const cat = await findCatById(Number(req.params.id));

	if (cat) {
		res.json(cat);
	} else {
		const error = new Error("Cat not found");
		error.status = 404;
		next(error);
	}
};

const getCatsByUserId = async (req, res) => {
	const cats = await findCatsByUserId(Number(req.params.id));
	res.json(cats);
};

// create
const postCat = async (req, res, next) => {
	console.log(req.file);
	console.log(req.body);

	if (!req.file) {
		const error = new Error("Invalid or missing file");
		error.status = 400;
		next(error);
		return;
	}

	const result = await addCat({
		...req.body,
		owner: res.locals.user.user_id,
		filename: req.file ? req.file.filename : null,
	});

	if (result.error) {
		return next(new Error(result.error));
	}

	res.status(201).json({ message: "New cat added.", result });
};

// update
const putCat = async (req, res, next) => {
	const cat = await findCatById(Number(req.params.id));

	if (!cat) {
		const error = new Error("Cat not found");
		error.status = 404;
		return next(error);
	}

	if (
		res.locals.user.role !== "admin" &&
		cat.owner !== res.locals.user.user_id
	) {
		const error = new Error("Forbidden");
		error.status = 403;
		return next(error);
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
		const error = new Error("Cat not updated");
		error.status = 403;
		next(error);
	}
};

const deleteCat = async (req, res, next) => {
	const cat = await findCatById(Number(req.params.id));

	if (!cat) {
		const error = new Error("Cat not found");
		error.status = 404;
		return next(error);
	}

	if (
		res.locals.user.role !== "admin" &&
		cat.owner !== res.locals.user.user_id
	) {
		const error = new Error("Forbidden");
		error.status = 403;
		return next(error);
	}

	const deletedCat = await removeCat(Number(req.params.id), res.locals.user);

	if (deletedCat) {
		res.json({ message: "Cat deleted.", deletedCat });
	} else {
		const error = new Error("Cat not deleted");
		error.status = 403;
		next(error);
	}
};

export { deleteCat, getCats, getCatById, getCatsByUserId, postCat, putCat };
