import { Router } from "express";
import { CarsController } from "../controllers/cars.controller";
import validQueryPaginationMiddleware from "../middlewares/pagination.middleware";
import Middlewares from "../middlewares/auth.middlewares";

export const carRoutes = Router();

carRoutes.post(
  "",
  Middlewares.Auth,
  Middlewares.EnsureIsSaleman,
  CarsController.create
);
carRoutes.get("", validQueryPaginationMiddleware, CarsController.listAll);
carRoutes.get("/:carId", CarsController.listOne);
carRoutes.patch(
  "/:carId",
  Middlewares.Auth,
  // Middlewares.IsOwner,
  CarsController.update
);
carRoutes.delete(
  "/:carId",
  Middlewares.Auth,
  Middlewares.IsOwner,
  CarsController.delete
);
