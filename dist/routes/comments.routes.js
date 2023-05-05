"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentRoutes = void 0;
const express_1 = require("express");
const comments_controller_1 = require("../controllers/comments.controller");
const auth_middlewares_1 = __importDefault(require("../middlewares/auth.middlewares"));
const ensureDataValid_middleware_1 = __importDefault(require("../middlewares/ensureDataValid.middleware"));
const comments_serializers_1 = require("../serializers/comments.serializers");
exports.commentRoutes = (0, express_1.Router)();
exports.commentRoutes.post("/:carId", auth_middlewares_1.default.Auth, (0, ensureDataValid_middleware_1.default)(comments_serializers_1.CreateCommentSerializer), comments_controller_1.CommentsController.create);
exports.commentRoutes.get("/:carId", comments_controller_1.CommentsController.list);
exports.commentRoutes.get("/date/:commentId", comments_controller_1.CommentsController.getDate);
exports.commentRoutes.patch("/:commentId", auth_middlewares_1.default.Auth, auth_middlewares_1.default.IsCommentOwner, comments_controller_1.CommentsController.update);
exports.commentRoutes.delete("/:commentId", auth_middlewares_1.default.Auth, auth_middlewares_1.default.IsCommentOwner, comments_controller_1.CommentsController.delete);
