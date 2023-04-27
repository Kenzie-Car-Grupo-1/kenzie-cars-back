import { Router } from "express";
import Middlewares from "../middlewares/auth.middlewares";
import AddressController from "../controllers/address.controller";

export const addressRoute = Router();

addressRoute.patch("", Middlewares.Auth, AddressController.update);
