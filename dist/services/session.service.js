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
const bcryptjs_1 = require("bcryptjs");
const data_source_1 = __importDefault(require("../data-source"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
const appError_1 = __importDefault(require("../errors/appError"));
const user_entity_1 = require("../entities/user.entity");
class SessionServices {
    static login({ email, password }) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRepository = data_source_1.default.getRepository(user_entity_1.Users);
            const user = yield userRepository.findOne({
                where: { email: email },
                relations: { address: true },
            });
            if (!user) {
                throw new appError_1.default("Email or password invalid", 403);
            }
            const passwordMatch = yield (0, bcryptjs_1.compare)(password, user.password);
            if (!passwordMatch) {
                throw new appError_1.default("Email or password invalid", 403);
            }
            const token = jsonwebtoken_1.default.sign({}, process.env.SECRET_KEY, {
                subject: user.id,
                expiresIn: "24h",
            });
            delete user.password;
            return { token, user };
        });
    }
}
exports.default = SessionServices;
