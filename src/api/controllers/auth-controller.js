import "dotenv/config";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { findUserByUsername } from "../model/user-model.js";

const postLogin = async (req, res) => {
	console.log("login", req.body);
	const { username, password } = req.body;

	if (!username || !password) {
		return res.sendStatus(400);
	}

	const user = await findUserByUsername(username);

	if (!user) {
		return res.sendStatus(401);
	}

	const passwordMatches = await bcrypt.compare(password, user.password);

	if (!passwordMatches) {
		return res.sendStatus(401);
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

const getMe = async (req, res) => {
	console.log("getMe", res.locals.user);
	if (res.locals.user) {
		res.json({ message: "token ok", user: res.locals.user });
	} else {
		res.sendStatus(401);
	}
};

export { getMe, postLogin };
