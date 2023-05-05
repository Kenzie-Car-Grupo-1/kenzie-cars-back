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
exports.resetPasswordSerializer = exports.sendEmailResetSerializer = exports.UpdateUserSerializer = exports.UpdateAddressSerializers = exports.LoginUserSerializer = exports.CreateUserSerializerWithoutPass = exports.CreateUserSerializer = exports.CreateAddressSerializers = void 0;
const yup = __importStar(require("yup"));
exports.CreateAddressSerializers = yup.object().shape({
    street: yup.string().required(),
    number: yup.string().required(),
    cep: yup.string().required(),
    city: yup.string().required(),
    state: yup.string().required(),
    complement: yup.string().required(),
});
exports.CreateUserSerializer = yup.object().shape({
    firstname: yup.string().required(),
    lastname: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required(),
    cpf: yup.string().required(),
    contact: yup.string().required(),
    isWhatsapp: yup.boolean().required(),
    birthdate: yup.string().required(),
    description: yup.string().required(),
    isSalesman: yup.boolean().required(),
    address: exports.CreateAddressSerializers,
});
exports.CreateUserSerializerWithoutPass = yup.object().shape({
    id: yup.string().required(),
    firstname: yup.string().required(),
    lastname: yup.string().required(),
    email: yup.string().email().required(),
    cpf: yup.string().required(),
    contact: yup.string().required(),
    isWhatsapp: yup.boolean().required(),
    birthdate: yup.string().required(),
    description: yup.string().required(),
    isSalesman: yup.boolean().required(),
    address: exports.CreateAddressSerializers,
});
exports.LoginUserSerializer = yup.object().shape({
    email: yup.string().required(),
    password: yup.string().required(),
});
exports.UpdateAddressSerializers = yup.object().shape({
    street: yup.string().notRequired(),
    number: yup.string().notRequired(),
    cep: yup.string().notRequired(),
    city: yup.string().notRequired(),
    state: yup.string().notRequired(),
    complement: yup.string().notRequired(),
});
exports.UpdateUserSerializer = yup.object().shape({
    firstname: yup.string().notRequired(),
    lastname: yup.string().notRequired(),
    email: yup.string().email().notRequired(),
    password: yup.string().notRequired(),
    cpf: yup.string().notRequired(),
    contact: yup.string().notRequired(),
    isWhatsapp: yup.boolean().notRequired(),
    birthdate: yup.string().notRequired(),
    description: yup.string().notRequired(),
    isSalesman: yup.boolean().notRequired(),
});
exports.sendEmailResetSerializer = yup.object().shape({
    email: yup.string().email().required(),
});
exports.resetPasswordSerializer = yup.object().shape({
    password: yup.string().required(),
});
