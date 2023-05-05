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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = __importDefault(require("../data-source"));
const user_entity_1 = require("../entities/user.entity");
const address_entity_1 = __importDefault(require("../entities/address.entity"));
const pagination_util_1 = require("../utils/pagination.util");
const bcryptjs_1 = require("bcryptjs");
const appError_1 = __importDefault(require("../errors/appError"));
const node_crypto_1 = require("node:crypto");
const sendEmail_util_1 = require("../utils/sendEmail.util");
class UsersService {
    static create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRepository = data_source_1.default.getRepository(user_entity_1.Users);
            const addressRepository = data_source_1.default.getRepository(address_entity_1.default);
            const { address } = data, userData = __rest(data, ["address"]);
            const createdUser = userRepository.create(userData);
            yield userRepository.save(createdUser);
            address.user = createdUser;
            const newAddress = addressRepository.create(address);
            yield addressRepository.save(newAddress);
            const response = yield userRepository.findOne({
                where: { id: createdUser.id },
                relations: { address: true },
            });
            const { password } = response, userResponse = __rest(response, ["password"]);
            return userResponse;
        });
    }
    static listOne(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRepository = data_source_1.default.getRepository(user_entity_1.Users);
            const response = yield userRepository.findOne({
                where: { id: userId },
                relations: { address: true },
            });
            const { password } = response, userResponse = __rest(response, ["password"]);
            return userResponse;
        });
    }
    static listAllCars(userId, query) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRepository = data_source_1.default.getRepository(user_entity_1.Users);
            const findUser = yield userRepository.findOne({
                where: { id: userId },
                relations: { cars: { images: true } },
            });
            return Object.assign({ message: "Carros listados com sucesso" }, (0, pagination_util_1.paginate)({
                list: findUser.cars.reverse(),
                query,
            }));
        });
    }
    static update(userData, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRepository = data_source_1.default.getRepository(user_entity_1.Users);
            const findUser = yield userRepository.findOneBy({
                id: userId,
            });
            if (userData.password !== undefined) {
                userData.password = yield (0, bcryptjs_1.hash)(userData.password, 10);
            }
            const userUpdated = yield userRepository.update(findUser.id, userData);
            const _a = (yield userRepository.findOneBy({
                id: userId,
            })), { password } = _a, userWithoutPass = __rest(_a, ["password"]);
            return userWithoutPass;
        });
    }
    static delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRepository = data_source_1.default.getRepository(user_entity_1.Users);
            const user = yield userRepository.delete({
                id: id,
            });
            return user;
        });
    }
    static sendResetEmailPassword(email, protocol, host) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRepository = data_source_1.default.getRepository(user_entity_1.Users);
            const findUser = yield userRepository.findOneBy({
                email: email,
            });
            if (!findUser) {
                throw new appError_1.default("user not found", 404);
            }
            const name = findUser.firstname + " " + findUser.lastname;
            const resetToken = (0, node_crypto_1.randomUUID)();
            yield userRepository.update({ id: findUser.id }, { reset_token: resetToken });
            const resetPasswordTemplate = sendEmail_util_1.emailService.resetPasswordTemplate(email, name, protocol, host, resetToken);
            yield sendEmail_util_1.emailService.sendEmail(resetPasswordTemplate);
        });
    }
    static resetPassword(password, resetToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRepository = data_source_1.default.getRepository(user_entity_1.Users);
            const findUser = yield userRepository.findOneBy({
                reset_token: resetToken,
            });
            console.log(findUser);
            if (!findUser) {
                throw new appError_1.default("User not found", 404);
            }
            yield userRepository.update(findUser.id, {
                password: (0, bcryptjs_1.hashSync)(password, 10),
                reset_token: null,
            });
        });
    }
}
exports.default = UsersService;
