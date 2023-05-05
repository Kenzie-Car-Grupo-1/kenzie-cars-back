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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_service_1 = __importDefault(require("../services/users.service"));
class UsersController {
    static create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            const response = yield users_service_1.default.create(data);
            return res.status(201).json(response);
        });
    }
    static listOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.params.id;
            const response = yield users_service_1.default.listOne(userId);
            return res.status(201).json(response);
        });
    }
    static listAllCars(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.params.id;
            const query = req.query;
            const response = yield users_service_1.default.listAllCars(userId, query);
            return res.status(201).json(response);
        });
    }
    static update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userData = req.body;
            const userId = req.user.id;
            const response = yield users_service_1.default.update(userData, userId);
            return res.status(200).json(response);
        });
    }
    static delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.user.id;
            const response = yield users_service_1.default.delete(userId);
            return res.status(204).json(response);
        });
    }
    static sendResetEmailPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email } = req.body;
            const { protocol } = req;
            const host = req.get("host");
            yield users_service_1.default.sendResetEmailPassword(email, protocol, host);
            return res.json({ message: "token send" });
        });
    }
    static resetPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { password } = req.body;
            const { token } = req.params;
            yield users_service_1.default.resetPassword(password, token);
            return res.json({ message: "password change with sucess" });
        });
    }
}
exports.default = UsersController;
