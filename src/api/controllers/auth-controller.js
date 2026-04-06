import "dotenv/config";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { findUserByUsername } from "../model/user-model.js";

const postLogin = async (req, res, next) => {
	console.log("login", req.body);
	const { username, password } = req.body;

	if (!username || !password) {
		const error = new Error("Username and password required");
		error.status = 400;
		return next(error);
	}

	const user = await findUserByUsername(username);

	if (!user) {
		const error = new Error("Invalid username or password");
		error.status = 401;
		return next(error);
	}

	const passwordMatches = await bcrypt.compare(password, user.password);

	if (!passwordMatches) {
		const error = new Error("Invalid username or password");
		error.status = 401;
		return next(error);
	}

	const userWithNoPassword = {
		user_id: user.user_id,
		name: user.name,
		username: user.username,
		email: user.email,
		role: user.role,
	};

	const token = jwt.sign(userWithNoPassword, process.env.JWT_SECRET, {
		expiresIn: "24h",
	});

	res.json({ user: userWithNoPassword, token });
};

const getMe = async (req, res, next) => {
	console.log("getMe", res.locals.user);
	if (res.locals.user) {
		res.json({ message: "token ok", user: res.locals.user });
	} else {
		const error = new Error("Unauthorized");
		error.status = 401;
		next(error);
	}
};

export { getMe, postLogin };
