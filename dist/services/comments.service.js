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
exports.CommentsService = void 0;
const cars_entity_1 = require("./../entities/cars.entity");
const data_source_1 = __importDefault(require("../data-source"));
const comment_entity_1 = require("../entities/comment.entity");
const user_entity_1 = require("../entities/user.entity");
const comments_serializers_1 = require("../serializers/comments.serializers");
class CommentsService {
    static create(data, adId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const commentsRepository = data_source_1.default.getRepository(comment_entity_1.Comment);
            const carRepository = data_source_1.default.getRepository(cars_entity_1.CarAd);
            const userRepository = data_source_1.default.getRepository(user_entity_1.Users);
            const userSalesman = yield userRepository.findOne({
                where: { id: userId },
                relations: { comment: true },
            });
            const carAd = yield carRepository.findOne({
                where: { id: adId },
                relations: { comment: true },
            });
            data.user = userSalesman;
            data.car = carAd;
            const comment = commentsRepository.create(data);
            yield commentsRepository.save(comment);
            const returnedComment = yield comments_serializers_1.CreateCommentResponseSerializer.validate(comment, { stripUnknown: true });
            return returnedComment;
        });
    }
    static getOneDate(commentId) {
        return __awaiter(this, void 0, void 0, function* () {
            const commentsRepository = data_source_1.default.getRepository(comment_entity_1.Comment);
            const comment = yield commentsRepository.findOneBy({ id: commentId });
            const today = new Date();
            const commentDate = new Date(comment.createdAt);
            if (today.getDay() == commentDate.getDay() &&
                today.getMonth() == commentDate.getMonth()) {
                return "hoje";
            }
            else {
                if (today.getMonth() == commentDate.getMonth()) {
                    const dayDifference = today.getDay() - commentDate.getDay();
                    return dayDifference == 1 ? "há 1 dia" : `há ${dayDifference} dias`;
                }
                else {
                    const monthDifference = today.getMonth() - commentDate.getMonth();
                    const dayDifference = today.getDay() - commentDate.getDay();
                    const timeDifference = dayDifference + monthDifference * 30;
                    if (dayDifference < 30) {
                        return `há ${timeDifference} dias`;
                    }
                    else {
                        return monthDifference == 1
                            ? `há ${monthDifference} mês`
                            : monthDifference < 12
                                ? `há ${monthDifference} meses`
                                : monthDifference == 12
                                    ? "há 1 ano"
                                    : `há ${Math.round(monthDifference / 12)} anos`;
                    }
                }
            }
        });
    }
    static list(adId) {
        return __awaiter(this, void 0, void 0, function* () {
            const carRepository = data_source_1.default.getRepository(cars_entity_1.CarAd);
            const car = yield carRepository.findOne({
                where: { id: adId },
                relations: { comment: true },
            });
            return car.comment.reverse();
        });
    }
    static update(data, commentId) {
        return __awaiter(this, void 0, void 0, function* () {
            const commentsRepository = data_source_1.default.getRepository(comment_entity_1.Comment);
            const comment = yield commentsRepository.findOneBy({ id: commentId });
            const updatedComment = commentsRepository.save(Object.assign(Object.assign({}, comment), data));
            return updatedComment;
        });
    }
    static delete(commentId) {
        return __awaiter(this, void 0, void 0, function* () {
            const commentsRepository = data_source_1.default.getRepository(comment_entity_1.Comment);
            const deleteCommenta = yield commentsRepository.findOneBy({
                id: commentId,
            });
            console.log("2", deleteCommenta);
            const deleteComment = yield commentsRepository.delete({ id: commentId });
            return deleteComment;
        });
    }
}
exports.CommentsService = CommentsService;
