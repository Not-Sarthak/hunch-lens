import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import routes from "./routes/index.js";

dotenv.config();

const app = express();

app.use(cors());

app.use(bodyParser.json());

app.use("/api", routes);

export default app;
