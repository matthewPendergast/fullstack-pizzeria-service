import request from "supertest";
import app from "../../src/app";
import { pool } from "../../src/config/db";

const testUser = {
	username: "testuser123",
	email: "testuser123@example.com",
	password: "testpass123",
};

describe("POST /signup and /login", () => {
	afterAll(async () => {
		await pool.query("DELETE FROM users WHERE email = $1", [
			testUser.email,
		]);
		await pool.end();
	});

	it("should sign up a new user", async () => {
		const res = await request(app).post("/api/auth/signup").send(testUser);
		expect(res.status).toBe(201);
		expect(res.body).toHaveProperty("id");
		expect(res.body.username).toBe(testUser.username);
		expect(res.headers["set-cookie"]).toBeDefined();
	});

	it("should not allow duplicate signup", async () => {
		// Silence error logging
		const consoleSpy = jest
			.spyOn(console, "error")
			.mockImplementation(() => {});
		const res = await request(app).post("/api/auth/signup").send(testUser);
		expect(res.status).toBeGreaterThanOrEqual(400);
		consoleSpy.mockRestore();
	});

	it("should log in an existing user", async () => {
		const res = await request(app).post("/api/auth/login").send({
			email: testUser.email,
			password: testUser.password,
		});
		expect(res.status).toBe(200);
		expect(res.body.username).toBe(testUser.username);
		expect(res.headers["set-cookie"]).toBeDefined();
	});

	it("should reject invalid login", async () => {
		const res = await request(app).post("/api/auth/login").send({
			email: testUser.email,
			password: "wrongpassword",
		});
		expect(res.status).toBe(401);
	});

	it("should return the current user with valid cookie", async () => {
		const loginRes = await request(app).post("/api/auth/login").send({
			email: testUser.email,
			password: testUser.password,
		});

		const cookie = loginRes.headers["set-cookie"];
		expect(cookie).toBeDefined();

		const meRes = await request(app)
			.get("/api/auth/me")
			.set("Cookie", cookie);

		expect(meRes.status).toBe(200);
		expect(meRes.body).toHaveProperty("id");
		expect(meRes.body).toHaveProperty("username", testUser.username);
	});
});
