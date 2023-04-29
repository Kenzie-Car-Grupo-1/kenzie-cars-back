import { CarAd } from "./../entities/cars.entity";
import AppDataSource from "../data-source";
import Comment from "../entities/comment.entity";
import { Users } from "../entities/user.entity";
import {
  ICommentCreate,
  ICommentUpdate,
} from "../interface/comments.interface";
import { ICreateUserResponse } from "../interface/users.interface";
import { paginate } from "../utils/pagination.util";

export class CommentsService {
  static async create(data: any, adId: string, userId: string) {
    const commentsRepository = AppDataSource.getRepository(Comment);
    const carRepository = AppDataSource.getRepository(CarAd);
    const userRepository = AppDataSource.getRepository(Users);

    const userSalesman = await userRepository.findOne({
      where: { id: userId },
    });
    const carAd = await carRepository.findOne({ where: { id: adId } });

    // data.user = userSalesman;
    // data.car = carAd;
    // const comment = commentsRepository.create(data);
    const comment = commentsRepository.create({
      ...data,
      userId: userSalesman,
      carId: carAd,
    });

    return comment;
  }

  // static async listOne() {
  //   const commentsRepository = AppDataSource.getRepository(Comment);
  // }

  static async list(adId: string) {
    const commentsRepository = AppDataSource.getRepository(Comment);
    // const carRepository = AppDataSource.getRepository(CarAd);

    const allComments = await commentsRepository.find({
      relations: { car: true },
    });

    return allComments.reverse();
  }

  static async update(data: ICommentUpdate, commentId: string) {
    const commentsRepository = AppDataSource.getRepository(Comment);

    const comment = await commentsRepository.findOneBy({ id: commentId });

    const updatedComment = commentsRepository.save({
      ...comment,
      ...data,
    });

    return updatedComment
  }

  static async delete(commentId: string) {
    const commentsRepository = AppDataSource.getRepository(Comment);

    const deleteComment = await commentsRepository.delete({ id: commentId });

    return deleteComment;
  }
}
