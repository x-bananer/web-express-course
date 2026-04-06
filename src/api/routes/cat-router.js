import express from "express";
import { body } from "express-validator";
import {
	getCats,
	getCatById,
	getCatsByUserId,
	postCat,
	putCat,
	deleteCat,
} from "../controllers/cat-controller.js";
import { authenticateToken } from "../../middlewares/authentication.js";
import { validationErrors } from "../../middlewares/error-handlers.js";
import { createThumbnail, upload } from "../../middlewares/upload.js";

const catRouter = express.Router();

catRouter.route("/").get(getCats);
catRouter
	.route("/")
	.post(
		authenticateToken,
		upload.single("cat"),
		body("cat_name").trim().isLength({ min: 3, max: 50 }),
		body("weight").trim().isFloat(),
		body("birthdate").trim().isDate(),
		validationErrors,
		createThumbnail,
		postCat,
	);
catRouter.route("/owner/:id").get(getCatsByUserId);

catRouter.route("/:id").get(getCatById);
catRouter
	.route("/:id")
	.put(
		authenticateToken,
		upload.single("cat"),
		body("cat_name").optional().trim().isLength({ min: 3, max: 50 }),
		body("weight").optional().trim().isFloat(),
		body("birthdate").optional().trim().isDate(),
		body("owner").optional().trim().isInt(),
		validationErrors,
		putCat,
	);
catRouter.route("/:id").delete(authenticateToken, deleteCat);

export default catRouter;
