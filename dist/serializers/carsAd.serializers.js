"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCarsAdResponseSerializer = exports.CreateCarsAdSerializer = void 0;
const yup = __importStar(require("yup"));
const users_serializers_1 = require("./users.serializers");
exports.CreateCarsAdSerializer = yup.object().shape({
    id: yup.string().notRequired(),
    brand: yup.string().required(),
    model: yup.string().required(),
    year: yup.string().required(),
    fuel_type: yup.string().required(),
    kms: yup.number().required(),
    color: yup.string().required(),
    price: yup.string().required(),
    description: yup.string().required(),
});
exports.CreateCarsAdResponseSerializer = yup.object().shape({
    id: yup.string().notRequired(),
    brand: yup.string().required(),
    model: yup.string().required(),
    year: yup.string().required(),
    fuel_type: yup.string().required(),
    kms: yup.number().required(),
    color: yup.string().required(),
    price: yup.string().required(),
    description: yup.string().required(),
    user: users_serializers_1.CreateUserSerializerWithoutPass,
});
