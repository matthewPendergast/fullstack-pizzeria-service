import request from "supertest";
import app from "../../src/app";
import { pool } from "../../src/config/db";
import { createTestUser, loginTestUser } from "../utils/testHelpers";

describe("Cart API", () => {
	let tokenCookie: string;

	beforeAll(async () => {
		await pool.query("DELETE FROM users");
		await pool.query("DELETE FROM cart_items");

		const user = await createTestUser();
		tokenCookie = await loginTestUser(user);
	});

	afterEach(async () => {
		await pool.query("DELETE FROM cart_items");
	});

	afterAll(async () => {
		await pool.end();
	});

	test("GET /api/cart should return empty array", async () => {
		const res = await request(app)
			.get("/api/cart")
			.set("Cookie", [tokenCookie]);

		expect(res.statusCode).toBe(200);
		expect(res.body).toEqual([]);
	});

	test("POST /api/cart should add a new item", async () => {
		const res = await request(app)
			.post("/api/cart")
			.set("Cookie", [tokenCookie])
			.send({
				item_id: 1,
				name: "Cheese Pizza",
				price: 8.99,
				quantity: 2,
			});

		expect(res.statusCode).toBe(201);
		expect(res.body.message).toBe("Item added/updated.");
	});
});
