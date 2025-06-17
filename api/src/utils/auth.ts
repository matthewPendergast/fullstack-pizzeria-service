import jwt from "jsonwebtoken";

const JWT_SECRET = (() => {
	if (!process.env.JWT_SECRET) {
		throw new Error(
			"JWT_SECRET is not defined in the environment variables.",
		);
	}
	return process.env.JWT_SECRET;
})();

export interface AuthTokenPayload {
	id: number;
	username: string;
}

export function generateToken(payload: AuthTokenPayload): string {
	return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyToken(token: string): AuthTokenPayload {
	return jwt.verify(token, JWT_SECRET) as AuthTokenPayload;
}
