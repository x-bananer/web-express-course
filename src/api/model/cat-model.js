// Mock data
const cats = [
	{
		id: 9592,
		name: "Frank",
		weight: 11,
		owner: 3609,
		filename: "f3dbafakjsdfhg4",
		birthdate: "2021-10-12",
	},
	{
		id: 9590,
		name: "Mittens",
		weight: 8,
		owner: 3602,
		filename: "f3dasdfkjsdfhgasdf",
		birthdate: "2021-10-12",
	},
];

const listCats = () => {
	return cats;
};

const findCatById = (id) => {
	return cats.find((cat) => cat.id === id);
};

const addCat = (cat) => {
	const { name, weight, owner, filename, birthdate } = cat;

	const newId = cats[0].id + 1;
	const newCat = {
		id: newId,
		name,
		weight,
		owner,
		filename,
		birthdate,
	};

	cats.unshift(newCat);

	return newCat;
};

const updateCat = (updatedCat) => {
	const index = cats.findIndex((cat) => cat.id === updatedCat.id);

	if (index === -1) {
		return null;
	}

	const existingCat = cats[index];
	const newCat = {
		...existingCat,
		...updatedCat,
		id: existingCat.id,
	};

	cats[index] = newCat;

	return newCat;
};

const removeCat = (id) => {
	const index = cats.findIndex((cat) => cat.id === id);

	if (index === -1) {
		return null;
	}

	const [deletedCat] = cats.splice(index, 1);
	return deletedCat;
};

export { listCats, findCatById, addCat, updateCat, removeCat };
