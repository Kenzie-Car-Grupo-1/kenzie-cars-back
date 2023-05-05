"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.carRoutes = void 0;
const express_1 = require("express");
const cars_controller_1 = require("../controllers/cars.controller");
const pagination_middleware_1 = __importDefault(require("../middlewares/pagination.middleware"));
const auth_middlewares_1 = __importDefault(require("../middlewares/auth.middlewares"));
exports.carRoutes = (0, express_1.Router)();
exports.carRoutes.post("", auth_middlewares_1.default.Auth, auth_middlewares_1.default.EnsureIsSaleman, cars_controller_1.CarsController.create);
exports.carRoutes.get("", pagination_middleware_1.default, cars_controller_1.CarsController.listAll);
exports.carRoutes.get("/:carId", cars_controller_1.CarsController.listOne);
exports.carRoutes.patch("/:carId", auth_middlewares_1.default.Auth, 
// Middlewares.IsOwner,
cars_controller_1.CarsController.update);
exports.carRoutes.delete("/:carId", auth_middlewares_1.default.Auth, auth_middlewares_1.default.IsOwner, cars_controller_1.CarsController.delete);
