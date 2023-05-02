import { CarAd } from "./../entities/cars.entity";
import AppDataSource from "../data-source";
import { Comment } from "../entities/comment.entity";
import { Users } from "../entities/user.entity";
import {
  ICommentCreate,
  ICommentResponse,
  ICommentUpdate,
  IUserComment,
} from "../interface/comments.interface";
import { ICreateUserResponse } from "../interface/users.interface";
import { paginate } from "../utils/pagination.util";
import moment from "moment";
import { CreateCommentResponseSerializer } from "../serializers/comments.serializers";

export class CommentsService {
  static async create(data: any, adId: string, userId: string): Promise<ICommentResponse> {
    const commentsRepository = AppDataSource.getRepository(Comment);
    const carRepository = AppDataSource.getRepository(CarAd);
    const userRepository = AppDataSource.getRepository(Users);

    const userSalesman = await userRepository.findOne({
      where: { id: userId },
      relations: { comment: true },
    });

    const carAd = await carRepository.findOne({
      where: { id: adId },
      relations: { comment: true },
    });

    data.user = userSalesman;
    data.car = carAd;

    const comment = commentsRepository.create(data);
    await commentsRepository.save(comment);

    const returnedComment = await CreateCommentResponseSerializer.validate(
      comment,
      { stripUnknown: true }
    );

    return returnedComment;
    // return comment;
  }

  // static async getOneDate(commentId: string) {
  //   const commentsRepository = AppDataSource.getRepository(Comment);

  //   const comment = await commentsRepository.findOneBy({ id: commentId });
  //   const today = moment().day();
  //   console.log(today);
  //   const commentDate = comment?.createdAt;
  //   console.log("12", commentDate)
  // }

  static async list(adId: string) {
    const carRepository = AppDataSource.getRepository(CarAd);

    const car = await carRepository.findOne({
      where: { id: adId },
      relations: { comment: true },
    });

    return car!.comment.reverse();
  }

  static async update(data: ICommentUpdate, commentId: string) {
    const commentsRepository = AppDataSource.getRepository(Comment);

    const comment = await commentsRepository.findOneBy({ id: commentId });

    const updatedComment = commentsRepository.save({
      ...comment,
      ...data,
    });

    return updatedComment;
  }

  static async delete(commentId: string) {
    const commentsRepository = AppDataSource.getRepository(Comment);

    const deleteCommenta = await commentsRepository.findOneBy({
      id: commentId,
    });
    console.log("2", deleteCommenta);
    const deleteComment = await commentsRepository.delete({ id: commentId });

    return deleteComment;
  }
}
