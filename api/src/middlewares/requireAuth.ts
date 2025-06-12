import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/auth";

export const requireAuth = (
	req: Request,
	res: Response,
	next: NextFunction,
): void => {
	try {
		const token = req.cookies.token;
		if (!token) throw new Error("Missing token");

		const decoded = verifyToken(token);
		(req as any).user = decoded;
		next();
	} catch {
		res.status(401).json({ error: "Unauthorized." });
	}
};
