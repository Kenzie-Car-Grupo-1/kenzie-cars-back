"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionRoutes = void 0;
const express_1 = require("express");
const session_controllers_1 = __importDefault(require("../controllers/session.controllers"));
const ensureDataValid_middleware_1 = __importDefault(require("../middlewares/ensureDataValid.middleware"));
const users_serializers_1 = require("../serializers/users.serializers");
exports.sessionRoutes = (0, express_1.Router)();
exports.sessionRoutes.post("", (0, ensureDataValid_middleware_1.default)(users_serializers_1.LoginUserSerializer), session_controllers_1.default.login);
