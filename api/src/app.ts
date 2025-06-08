import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import router from "./routes";

dotenv.config();

const app = express();

app.use(helmet());

app.use(
	cors({
		origin: process.env.CLIENT_URL,
		credentials: true,
	}),
);
app.use(express.json());

app.use(router);

export default app;
