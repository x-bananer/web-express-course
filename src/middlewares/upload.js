import sharp from "sharp";

const createThumbnail = async (req, res, next) => {
	if (!req.file) {
		next();
		return;
	}
	console.log(req.file.path);

	let extension = "jpg";
	if (req.file.mimetype === "image/png") {
		extension = "png";
	} else if (req.file.mimetype === "image/gif") {
		extension = "gif";
	} else if (req.file.mimetype === "image/webp") {
		extension = "webp";
	}

	const originalPathWithoutExtension = req.file.path.replace(/\.[^.]+$/, "");

	await sharp(req.file.path)
		.resize(160, 160)
		.toFile(`${originalPathWithoutExtension}_thumb.${extension}`);
	next();
};

export { createThumbnail };
