import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { pool } from "../config/db";
import { generateToken } from "../utils/auth";
import { User } from "../models/userModel";

export const signup = async (req: Request, res: Response): Promise<void> => {
	const { username, email, password } = req.body;

	if (!username || !email || !password) {
		res.status(400).json({ error: "Missing fields." });
		return;
	}

	try {
		const hashedPassword = await bcrypt.hash(password, 10);
		const result = await pool.query<User>(
			`
			INSERT INTO users (username, email, password_hash)
			VALUES ($1, $2, $3)
			RETURNING *
			`,
			[username, email, hashedPassword],
		);
		const user = result.rows[0];
		const token = generateToken({ id: user.id, username: user.username });

		res.cookie("token", token, { httpOnly: true })
			.status(201)
			.json({ id: user.id, username: user.username });
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Signup failed." });
	}
};

export const login = async (req: Request, res: Response): Promise<void> => {
	const { email, password } = req.body;

	if (!email || !password) {
		res.status(400).json({ error: "Missing credentials." });
		return;
	}

	try {
		const result = await pool.query<User>(
			"SELECT * FROM users WHERE email = $1",
			[email],
		);
		const user = result.rows[0];

		if (!user || !(await bcrypt.compare(password, user.password_hash))) {
			res.status(401).json({ error: "Invalid credentials." });
			return;
		}

		const token = generateToken({ id: user.id, username: user.username });

		res.cookie("token", token, { httpOnly: true })
			.status(200)
			.json({ id: user.id, username: user.username });
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Login failed." });
	}
};

export const getCurrentUser = (req: Request, res: Response): void => {
	// Exclude iat/exp timestamps from response
	const { iat, exp, ...userData } = (req as any).user;
	res.status(200).json(userData);
};
