import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import router from "./routes";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

app.use(helmet());

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api", router);

export default app;
