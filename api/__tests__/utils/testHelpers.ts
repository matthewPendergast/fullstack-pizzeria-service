import request from "supertest";
import app from "../../src/app";

export const createTestUser = async () => {
	const uniqueSuffix = Math.floor(Math.random() * 100000);
	const username = `testuser_${uniqueSuffix}`;
	const email = `test_${uniqueSuffix}@example.com`;
	const password = "testpass123";

	await request(app)
		.post("/api/auth/signup")
		.send({ username, email, password });

	return { username, email, password };
};

export async function loginTestUser(user: { email: string; password: string }) {
	const res = await request(app).post("/api/auth/login").send(user);
	const cookies = res.headers["set-cookie"];

	if (!Array.isArray(cookies)) {
		throw new Error("No cookies returned in login response.");
	}

	return cookies.find((cookie) => cookie.startsWith("token="))!;
}
