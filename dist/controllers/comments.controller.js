"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentsController = void 0;
const comments_service_1 = require("./../services/comments.service");
class CommentsController {
    static create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            const { carId } = req.params;
            const userId = req.user.id;
            const response = yield comments_service_1.CommentsService.create(data, carId, userId);
            return res.status(201).json(response);
        });
    }
    static list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { carId } = req.params;
            const response = yield comments_service_1.CommentsService.list(carId);
            return res.status(200).json(response);
        });
    }
    static getDate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { commentId } = req.params;
            const response = yield comments_service_1.CommentsService.getOneDate(commentId);
            return res.status(200).json(response);
        });
    }
    static update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            const { commentId } = req.params;
            const response = yield comments_service_1.CommentsService.update(data, commentId);
            return res.status(200).json(response);
        });
    }
    static delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { commentId } = req.params;
            const response = yield comments_service_1.CommentsService.delete(commentId);
            return res.status(204).json(response);
        });
    }
}
exports.CommentsController = CommentsController;
