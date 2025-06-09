import { Request, Response } from "express";
import { MenuItem, getAllMenuItems } from "../models/menuModel";

export const getMenu = async (req: Request, res: Response): Promise<void> => {
	try {
		const menu: MenuItem[] = await getAllMenuItems();
		res.status(200).json(menu);
	} catch (err) {
		res.status(500).json({ error: "Failed to retrieve menu items." });
	}
};
