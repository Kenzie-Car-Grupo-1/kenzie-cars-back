import "reflect-metadata";
import "express-async-errors";
import express from "express";
import cors from "cors";

import { carRoutes } from "./routes/cars.routes";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/cars", carRoutes);

export default app;
