import { validationResult } from "express-validator";

const notFoundHandler = (req, res, next) => {
	const error = new Error(`Not Found - ${req.originalUrl}`);
	error.status = 404;
	next(error);
};

const errorHandler = (err, req, res, next) => {
	void next;
	res.status(err.status || 500);
	res.json({
		error: {
			message: err.message,
			status: err.status || 500,
		},
	});
};

const validationErrors = (req, res, next) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		const messages = errors
			.array()
			.map((error) => `${error.path}: ${error.msg}`)
			.join(", ");

		const validationError = new Error(messages);
		validationError.status = 400;
		next(validationError);
		return;
	}

	next();
};

export { errorHandler, notFoundHandler, validationErrors };
