import "reflect-metadata";
import "express-async-errors";
import express from "express";
import cors from "cors";
// import "swagger-ui-express";
// import "swagger.json";
// const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('./swagger.json');

import { carRoutes } from "./routes/cars.routes";
import { userRoutes } from "./routes/users.routes";
import { sessionRoutes } from "./routes/session.routes";
import { addressRoutes } from "./routes/address.routes";
import { commentRoutes } from "./routes/comments.routes";
import handleError from "./errors/handleError";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/cars", carRoutes);
app.use("/users", userRoutes);
app.use("/session", sessionRoutes);
app.use("/address", addressRoutes);
app.use("/comments", commentRoutes);

app.use(handleError);
// app.use("/api-docs", swagger);
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default app;
