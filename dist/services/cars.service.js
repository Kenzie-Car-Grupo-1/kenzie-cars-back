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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarsServices = void 0;
const data_source_1 = __importDefault(require("../data-source"));
const cars_entity_1 = require("../entities/cars.entity");
const pagination_util_1 = require("../utils/pagination.util");
const carImages_entity_1 = require("../entities/carImages.entity");
const user_entity_1 = require("../entities/user.entity");
class CarsServices {
    static create(data, userId) {
        var _a, e_1, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            const carsRepository = data_source_1.default.getRepository(cars_entity_1.CarAd);
            const carImagesRepository = data_source_1.default.getRepository(carImages_entity_1.CarImage);
            const userRepository = data_source_1.default.getRepository(user_entity_1.Users);
            const userSaleman = yield userRepository.findOne({ where: { id: userId } });
            let { images } = data, dataCar = __rest(data, ["images"]);
            dataCar.user = userSaleman;
            const cars = carsRepository.create(dataCar);
            yield carsRepository.save(cars);
            if (images) {
                try {
                    for (var _d = true, images_1 = __asyncValues(images), images_1_1; images_1_1 = yield images_1.next(), _a = images_1_1.done, !_a;) {
                        _c = images_1_1.value;
                        _d = false;
                        try {
                            const image = _c;
                            const objImg = {
                                url: image,
                                car: cars,
                            };
                            const img = carImagesRepository.create(objImg);
                            yield carImagesRepository.save(img);
                        }
                        finally {
                            _d = true;
                        }
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (!_d && !_a && (_b = images_1.return)) yield _b.call(images_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
            const carsAd = yield carsRepository.findOne({
                where: { id: cars.id },
                relations: { images: true, user: true, comment: true },
            });
            delete carsAd.user.password;
            return carsAd;
        });
    }
    static listAll(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const carsRepository = data_source_1.default.getRepository(cars_entity_1.CarAd);
            const cars = yield carsRepository.find({
                relations: { images: true, user: true, comment: true },
            });
            return Object.assign({ message: "Carros listados com sucesso" }, (0, pagination_util_1.paginate)({
                list: cars.reverse(),
                query,
            }));
        });
    }
    static listOne(carId) {
        return __awaiter(this, void 0, void 0, function* () {
            const carsRepository = data_source_1.default.getRepository(cars_entity_1.CarAd);
            const carsAd = yield carsRepository.findOne({
                where: { id: carId },
                relations: { images: true, user: true, comment: { user: true } },
            });
            delete carsAd.user.password;
            return carsAd;
        });
    }
    static update(data, carId) {
        var _a, e_2, _b, _c, _d, e_3, _e, _f;
        return __awaiter(this, void 0, void 0, function* () {
            const carsRepository = data_source_1.default.getRepository(cars_entity_1.CarAd);
            const carImagesRepository = data_source_1.default.getRepository(carImages_entity_1.CarImage);
            const carsAd = yield carsRepository.findOne({
                where: { id: carId },
                relations: { images: true, user: true, comment: true },
            });
            if (carsAd.images) {
                try {
                    for (var _g = true, _h = __asyncValues(carsAd.images), _j; _j = yield _h.next(), _a = _j.done, !_a;) {
                        _c = _j.value;
                        _g = false;
                        try {
                            const image = _c;
                            console.log(image);
                            yield carImagesRepository.delete({ id: image.id });
                        }
                        finally {
                            _g = true;
                        }
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (!_g && !_a && (_b = _h.return)) yield _b.call(_h);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
            }
            const carsAdUpdate = carsRepository.create(Object.assign(Object.assign({}, carsAd), data));
            yield carsRepository.save(carsAdUpdate);
            if (data.images) {
                try {
                    for (var _k = true, _l = __asyncValues(data.images), _m; _m = yield _l.next(), _d = _m.done, !_d;) {
                        _f = _m.value;
                        _k = false;
                        try {
                            const image = _f;
                            const objImg = {
                                url: image,
                                car: carsAdUpdate,
                            };
                            const img = carImagesRepository.create(objImg);
                            yield carImagesRepository.save(img);
                            console.log(img);
                        }
                        finally {
                            _k = true;
                        }
                    }
                }
                catch (e_3_1) { e_3 = { error: e_3_1 }; }
                finally {
                    try {
                        if (!_k && !_d && (_e = _l.return)) yield _e.call(_l);
                    }
                    finally { if (e_3) throw e_3.error; }
                }
            }
            const carUpdated = yield carsRepository.findOne({
                where: { id: carsAdUpdate.id },
                relations: { images: true, user: true, comment: true },
            });
            delete carUpdated.user.password;
            return carUpdated;
        });
    }
    static delete(carId) {
        return __awaiter(this, void 0, void 0, function* () {
            const carsRepository = data_source_1.default.getRepository(cars_entity_1.CarAd);
            const deletedCarAd = yield carsRepository.delete({ id: carId });
            return deletedCarAd;
        });
    }
}
exports.CarsServices = CarsServices;
