import express from "express";
import api from "./api/index.js";
import cors from "cors";
import { errorHandler, notFoundHandler } from "./middlewares/error-handlers.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static("uploads"));
app.use("/api/v1", api);
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
