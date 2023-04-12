import { Router } from "express";
import { CarsController } from "../controllers/cars.controller";

export const carRoutes = Router();

carRoutes.post("", CarsController.create);
carRoutes.get("", CarsController.listAll);
carRoutes.get("/:carId", CarsController.listOne);
carRoutes.patch("/:carId", CarsController.update);
carRoutes.delete("/:carId", CarsController.delete);
