import { Request, Response } from "express";
import { pool } from "../config/db";

export const getCart = async (req: Request, res: Response) => {
	const userId = req.user?.id;
	const { rows } = await pool.query(
		"SELECT * FROM cart_items WHERE user_id = $1",
		[userId],
	);
	res.json(rows);
};

export const clearCart = async (req: Request, res: Response) => {
	const userId = req.user?.id;
	await pool.query("DELETE FROM cart_items WHERE user_id = $1", [userId]);
	res.json({ message: "Cart cleared." });
};

export const addItemToCart = async (req: Request, res: Response) => {
	const userId = req.user?.id;
	const { item_id, name, price, quantity } = req.body;
	await pool.query(
		`
		INSERT INTO cart_items (user_id, item_id, name, price, quantity)
		VALUES ($1, $2, $3, $4, $5)
		ON CONFLICT (user_id, item_id)
		DO UPDATE SET quantity = cart_items.quantity + EXCLUDED.quantity
		`,
		[userId, item_id, name, price, quantity],
	);
	res.status(201).json({ message: "Item added/updated." });
};

export const updateItemQuantity = async (req: Request, res: Response) => {
	const userId = req.user?.id;
	const { itemId } = req.params;
	const { quantity } = req.body;
	await pool.query(
		"UPDATE cart_items SET quantity = $1 WHERE user_id = $2 AND item_id = $3",
		[quantity, userId, itemId],
	);
	res.json({ message: "Quantity updated." });
};

export const deleteItemFromCart = async (req: Request, res: Response) => {
	const userId = req.user?.id;
	const { itemId } = req.params;
	await pool.query(
		"DELETE FROM cart_items WHERE user_id = $1 AND item_id = $2",
		[userId, itemId],
	);
	res.json({ message: "Item deleted." });
};

export const mergeCart = async (req: Request, res: Response) => {
	const userId = req.user?.id;
	const localCart = req.body;

	if (!Array.isArray(localCart)) {
		res.status(400).json({ error: "Invalid cart format" });
		return;
	}

	for (const item of localCart) {
		const itemId = item.id ?? item.item_id;
		if (!itemId) continue;

		await pool.query(
			`
			INSERT INTO cart_items (user_id, item_id, name, price, quantity)
			VALUES ($1, $2, $3, $4, $5)
			ON CONFLICT (user_id, item_id)
			DO UPDATE SET quantity = cart_items.quantity + EXCLUDED.quantity
			`,
			[userId, itemId, item.name, item.price, item.quantity],
		);
	}

	res.json({ message: "Cart merged." });
};
