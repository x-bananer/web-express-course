import express from "express";
import multer from "multer";
import {
	getCats,
	getCatById,
	getCatsByUserId,
	postCat,
	putCat,
	deleteCat,
} from "../controllers/cat-controller.js";
import { createThumbnail } from "../../middlewares/upload.js";

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
catRouter.route("/").post(upload.single("cat"), createThumbnail, postCat);
catRouter.route("/owner/:id").get(getCatsByUserId);

catRouter.route("/:id").get(getCatById);
catRouter.route("/:id").put(upload.single("cat"), putCat);
catRouter.route("/:id").delete(deleteCat);

export default catRouter;
