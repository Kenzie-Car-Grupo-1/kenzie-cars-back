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
exports.CarAd = void 0;
const typeorm_1 = require("typeorm");
const carImages_entity_1 = require("./carImages.entity");
const user_entity_1 = require("./user.entity");
const comment_entity_1 = require("./comment.entity");
let CarAd = class CarAd {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], CarAd.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 50, nullable: false }),
    __metadata("design:type", String)
], CarAd.prototype, "brand", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 50, nullable: false }),
    __metadata("design:type", String)
], CarAd.prototype, "model", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 4, nullable: false }),
    __metadata("design:type", String)
], CarAd.prototype, "year", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 50, nullable: false }),
    __metadata("design:type", String)
], CarAd.prototype, "fuel_type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int", nullable: false }),
    __metadata("design:type", Number)
], CarAd.prototype, "kms", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 10, nullable: false }),
    __metadata("design:type", String)
], CarAd.prototype, "color", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 20, nullable: false }),
    __metadata("design:type", String)
], CarAd.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 255, nullable: false }),
    __metadata("design:type", String)
], CarAd.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "boolean", default: true }),
    __metadata("design:type", Boolean)
], CarAd.prototype, "isPublished", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => carImages_entity_1.CarImage, (carImage) => carImage.car, {
        nullable: true,
    }),
    __metadata("design:type", Array)
], CarAd.prototype, "images", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.Users, { onDelete: "CASCADE" }),
    __metadata("design:type", user_entity_1.Users)
], CarAd.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => comment_entity_1.Comment, (comment) => comment.car),
    __metadata("design:type", Array)
], CarAd.prototype, "comment", void 0);
CarAd = __decorate([
    (0, typeorm_1.Entity)("cars")
], CarAd);
exports.CarAd = CarAd;
