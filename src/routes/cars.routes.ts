import { Router } from "express";
import { CarsController } from "../controllers/cars.controller";
import validQueryPaginationMiddleware from "../middlewares/pagination.middleware";

export const carRoutes = Router();

carRoutes.post("", CarsController.create);
carRoutes.get("", validQueryPaginationMiddleware, CarsController.listAll);
carRoutes.get("/:carId", CarsController.listOne);
carRoutes.patch("/:carId", CarsController.update);
carRoutes.delete("/:carId", CarsController.delete);
