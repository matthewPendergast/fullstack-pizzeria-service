import request from "supertest";
import app from "../../src/app";
import { pool } from "../../src/config/db";
import { createTestUser, loginTestUser } from "../utils/testHelpers";

describe("Order API", () => {
	let tokenCookie: string;

	beforeAll(async () => {
		await pool.query("DELETE FROM users");
		await pool.query("DELETE FROM cart_items");
		await pool.query("DELETE FROM orders");
		await pool.query("DELETE FROM order_items");

		const user = await createTestUser();
		tokenCookie = await loginTestUser(user);
	});

	afterEach(async () => {
		await pool.query("DELETE FROM cart_items");
		await pool.query("DELETE FROM orders");
		await pool.query("DELETE FROM order_items");
	});

	afterAll(async () => {
		await pool.end();
	});

	test("should return 400 if cart is empty", async () => {
		const res = await request(app)
			.post("/api/order")
			.set("Cookie", tokenCookie);

		expect(res.status).toBe(400);
		expect(res.body).toHaveProperty("error", "Cart is empty.");
	});

	test("should place an order and clear the cart", async () => {
		await request(app).post("/api/cart").set("Cookie", tokenCookie).send({
			item_id: 1,
			name: "Cheese Pizza",
			price: 8.99,
			quantity: 2,
		});

		const res = await request(app)
			.post("/api/order")
			.set("Cookie", tokenCookie);

		expect(res.status).toBe(201);
		expect(res.body).toHaveProperty(
			"message",
			"Order placed successfully.",
		);
		expect(res.body).toHaveProperty("orderId");

		const cartRes = await request(app)
			.get("/api/cart")
			.set("Cookie", tokenCookie);

		expect(cartRes.status).toBe(200);
		expect(cartRes.body).toEqual([]);
	});
});
