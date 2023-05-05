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
exports.CarsController = void 0;
const cars_service_1 = require("../services/cars.service");
class CarsController {
    static create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            const userId = req.user.id;
            const response = yield cars_service_1.CarsServices.create(data, userId);
            return res.status(201).json(response);
        });
    }
    static listAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = req.query;
            const response = yield cars_service_1.CarsServices.listAll(query);
            return res.status(200).json(response);
        });
    }
    static listOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { carId } = req.params;
            const response = yield cars_service_1.CarsServices.listOne(carId);
            return res.status(200).json(response);
        });
    }
    static update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { carId } = req.params;
            const data = req.body;
            const response = yield cars_service_1.CarsServices.update(data, carId);
            return res.status(200).json(response);
        });
    }
    static delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { carId } = req.params;
            const response = yield cars_service_1.CarsServices.delete(carId);
            return res.status(204).json(response);
        });
    }
}
exports.CarsController = CarsController;
