import express from "express";
import multer from "multer";
import {
	getCats,
	getCatById,
	postCat,
	putCat,
	deleteCat,
} from "../controllers/cat-controller.js";

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "uploads/");
	},
	filename: (req, file, cb) => {
		cb(null, `${Date.now()}-${file.originalname}`);
	},
});

const upload = multer({ storage });

const catRouter = express.Router();

catRouter.route("/").get(getCats);
catRouter.route("/").post(upload.single("cat"), postCat);

catRouter.route("/:id").get(getCatById);
catRouter.route("/:id").put(putCat);
catRouter.route("/:id").delete(deleteCat);

export default catRouter;
