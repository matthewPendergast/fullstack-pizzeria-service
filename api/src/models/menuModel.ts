import { pool } from "../config/db";

export interface MenuItem {
	id: number;
	name: string;
	description: string;
	price: number;
	category: string;
	image_url: string | null;
	created_at: Date;
}

export const getAllMenuItems = async (): Promise<MenuItem[]> => {
	try {
		const result = await pool.query("SELECT * FROM menu_items ORDER BY id");
		return result.rows;
	} catch (err: any) {
		throw err;
	}
};
