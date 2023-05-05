"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarImage = void 0;
const typeorm_1 = require("typeorm");
const cars_entity_1 = require("./cars.entity");
let CarImage = class CarImage {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], CarImage.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 255, nullable: false }),
    __metadata("design:type", String)
], CarImage.prototype, "url", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => cars_entity_1.CarAd, (cars) => cars.images, { onDelete: "CASCADE" }),
    __metadata("design:type", cars_entity_1.CarAd)
], CarImage.prototype, "car", void 0);
CarImage = __decorate([
    (0, typeorm_1.Entity)("carImage")
], CarImage);
exports.CarImage = CarImage;
