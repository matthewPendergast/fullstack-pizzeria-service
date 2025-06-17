import request from "supertest";
import app from "../../src/app";

describe("GET /menu", () => {
	it("should return a 200 status", async () => {
		const response = await request(app).get("/api/menu");
		expect(response.status).toBe(200);
	});

	it("should return an array of menu items", async () => {
		const response = await request(app).get("/api/menu");
		expect(Array.isArray(response.body)).toBe(true);
		expect(response.body.length).toBeGreaterThan(0);

		const item = response.body[0];
		expect(item).toHaveProperty("name");
		expect(item).toHaveProperty("description");
		expect(item).toHaveProperty("price");
		expect(item).toHaveProperty("category");
	});
});
