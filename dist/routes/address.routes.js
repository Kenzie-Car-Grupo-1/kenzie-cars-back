"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addressRoutes = void 0;
const express_1 = require("express");
const auth_middlewares_1 = __importDefault(require("../middlewares/auth.middlewares"));
const address_controller_1 = __importDefault(require("../controllers/address.controller"));
exports.addressRoutes = (0, express_1.Router)();
exports.addressRoutes.patch("/:id", auth_middlewares_1.default.Auth, address_controller_1.default.update);
