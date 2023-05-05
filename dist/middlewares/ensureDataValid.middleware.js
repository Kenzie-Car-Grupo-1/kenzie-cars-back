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
const appError_1 = __importDefault(require("../errors/appError"));
const ensureDataIsValidMiddleware = (schema) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validatedData = yield schema.validate(req.body, {
            abortEarly: false,
            stripUnknown: true,
        });
        req.body = validatedData;
        return next();
    }
    catch (error) {
        throw new appError_1.default(error.errors, 400);
    }
});
exports.default = ensureDataIsValidMiddleware;
