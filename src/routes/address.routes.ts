import { Router } from "express";
import Middlewares from "../middlewares/auth.middlewares";
import AddressController from "../controllers/address.controller";

export const addressRoutes = Router();

addressRoutes.patch("/:id", Middlewares.Auth, AddressController.update);
