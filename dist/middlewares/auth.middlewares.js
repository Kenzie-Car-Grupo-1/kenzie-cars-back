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
const data_source_1 = __importDefault(require("../data-source"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const appError_1 = __importDefault(require("../errors/appError"));
require("dotenv/config");
const cars_entity_1 = require("../entities/cars.entity");
const user_entity_1 = require("../entities/user.entity");
const comment_entity_1 = require("../entities/comment.entity");
class Middlewares {
    static Auth(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let token = req.headers.authorization;
            if (!token) {
                throw new appError_1.default("Invalid token", 401);
            }
            token = token.split(" ")[1];
            jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY, (error, decoded) => {
                if (error) {
                    throw new appError_1.default(error.message, 401);
                }
                req.user = {
                    id: decoded.sub,
                };
                return next();
            });
        });
    }
    static EnsureIsSaleman(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRepository = data_source_1.default.getRepository(user_entity_1.Users);
            const verifyUserType = yield userRepository.findOne({
                where: { id: req.user.id },
            });
            if (!verifyUserType.isSalesman) {
                throw new appError_1.default("You can not do that because you not a saleman!", 401);
            }
            return next();
        });
    }
    static IsOwner(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const carsRepository = data_source_1.default.getRepository(cars_entity_1.CarAd);
            const carsAD = yield carsRepository.findOne({
                where: { id: req.params.id },
                relations: { user: true },
            });
            if ((carsAD === null || carsAD === void 0 ? void 0 : carsAD.user.id) !== req.user.id) {
                throw new appError_1.default("You can not do that because you not a owner of this car", 401);
            }
            return next();
        });
    }
    static IsCommentOwner(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const commentsRepository = data_source_1.default.getRepository(comment_entity_1.Comment);
            const comment = yield commentsRepository.findOne({
                where: { id: req.params.commentId },
                relations: { user: true },
            });
            console.log(comment);
            if ((comment === null || comment === void 0 ? void 0 : comment.user.id) !== req.user.id) {
                throw new appError_1.default("You cannot do this operation because you are not the owner of the comment", 401);
            }
            return next();
        });
    }
    static Example(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
}
exports.default = Middlewares;
