import request from "supertest";
import app from "../../src/app";

let userCounter = 1;

export async function createTestUser() {
	const user = {
		username: `testuser${userCounter}`,
		email: `test${userCounter}@email.com`,
		password: "password123",
	};
	userCounter++;

	await request(app).post("/api/auth/signup").send(user);
	return user;
}

export async function loginTestUser(user: { email: string; password: string }) {
	const res = await request(app).post("/api/auth/login").send(user);
	const cookies = res.headers["set-cookie"];

	if (!Array.isArray(cookies)) {
		throw new Error("No cookies returned in login response.");
	}

	return cookies.find((cookie) => cookie.startsWith("token="))!;
}
