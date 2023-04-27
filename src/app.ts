import "reflect-metadata";
import "express-async-errors";
import express from "express";
import cors from "cors";

import { carRoutes } from "./routes/cars.routes";
import { usersRouter } from "./routes/users.routes";
import handleError from "./errors/handleError";
import { sessionRouter } from "./routes/session.routes";
import { addressRoute } from "./routes/address.routes";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/cars", carRoutes);
app.use("/users", usersRouter);
app.use("/session", sessionRouter);
app.use("/address", addressRoute);

app.use(handleError);

export default app;
