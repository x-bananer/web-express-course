import multer from "multer";
import sharp from "sharp";

const upload = multer({
	dest: "uploads/",
	limits: {
		fileSize: 10 * 1024 * 1024,
	},
	fileFilter: (req, file, cb) => {
		if (
			file.mimetype.startsWith("image/") ||
			file.mimetype.startsWith("video/")
		) {
			cb(null, true);
		} else {
			const error = new Error("Only images and videos are allowed!");
			error.status = 400;
			cb(error, false);
		}
	},
});

const createThumbnail = async (req, res, next) => {
	try {
		if (!req.file) {
			next();
			return;
		}

		if (!req.file.mimetype.startsWith("image/")) {
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

		const originalPathWithoutExtension = req.file.path.replace(
			/\.[^.]+$/,
			"",
		);

		await sharp(req.file.path)
			.resize(160, 160)
			.toFile(`${originalPathWithoutExtension}_thumb.${extension}`);
		next();
	} catch (error) {
		next(error);
	}
};

export { createThumbnail, upload };
