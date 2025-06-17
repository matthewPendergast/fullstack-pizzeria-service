import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
	host: process.env.POSTGRES_HOST || "db",
	port: Number(process.env.POSTGRES_PORT || 5432),
	user: process.env.POSTGRES_USER,
	password: process.env.POSTGRES_PASSWORD,
	database: process.env.POSTGRES_DB,
});

export { pool };
