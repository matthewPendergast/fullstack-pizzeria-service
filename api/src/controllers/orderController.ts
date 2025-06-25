import { Request, Response } from "express";
import { pool } from "../config/db";

export const placeOrder = async (req: Request, res: Response) => {
	const userId = req.user?.id;

	try {
		const { rows: cartItems } = await pool.query(
			"SELECT * FROM cart_items WHERE user_id = $1",
			[userId],
		);

		if (cartItems.length === 0) {
			res.status(400).json({ error: "Cart is empty." });
			return;
		}

		const total = cartItems.reduce((sum, item) => {
			return sum + Number(item.price) * item.quantity;
		}, 0);

		const orderResult = await pool.query(
			"INSERT INTO orders (user_id, total) VALUES ($1, $2) RETURNING *",
			[userId, total],
		);
		const orderId = orderResult.rows[0].id;

		const insertItemsQuery = `
			INSERT INTO order_items (order_id, item_id, name, price, quantity)
			VALUES ($1, $2, $3, $4, $5)
		`;

		for (const item of cartItems) {
			await pool.query(insertItemsQuery, [
				orderId,
				item.item_id,
				item.name,
				item.price,
				item.quantity,
			]);
		}

		await pool.query("DELETE FROM cart_items WHERE user_id = $1", [userId]);

		res.status(201).json({
			message: "Order placed successfully.",
			orderId,
		});
	} catch (err) {
		console.error("Order failed:", err);
		res.status(500).json({ error: "Order placement failed." });
	}
};
