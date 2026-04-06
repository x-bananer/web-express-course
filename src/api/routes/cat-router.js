import express from "express";

import {
	getCats,
	getCatById,
	postCat,
	putCat,
	deleteCat,
} from "../controllers/cat-controller.js";

const catRouter = express.Router();

catRouter.route("/").get(getCats);
catRouter.route("/").post(postCat);

catRouter.route("/:id").get(getCatById);
catRouter.route("/:id").put(putCat);
catRouter.route("/:id").delete(deleteCat);

export default catRouter;
