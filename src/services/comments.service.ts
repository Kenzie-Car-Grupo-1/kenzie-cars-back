import { CarAd } from "./../entities/cars.entity";
import AppDataSource from "../data-source";
import { Comment } from "../entities/comment.entity";
import { Users } from "../entities/user.entity";
import {
  ICommentResponse,
  ICommentUpdate,
} from "../interface/comments.interface";
import { CreateCommentResponseSerializer } from "../serializers/comments.serializers";

export class CommentsService {
  static async create(
    data: any,
    adId: string,
    userId: string
  ): Promise<ICommentResponse> {
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
  }

  static async getOneDate(commentId: string): Promise<string> {
    const commentsRepository = AppDataSource.getRepository(Comment);
    const comment = await commentsRepository.findOneBy({ id: commentId });

    const today = new Date();
    const commentDate = new Date(comment!.createdAt);

    if (
      today.getDay() == commentDate.getDay() &&
      today.getMonth() == commentDate.getMonth()
    ) {
      return "hoje";
    } else {
      if (today.getMonth() == commentDate.getMonth()) {
        const dayDifference = today.getDay() - commentDate.getDay();
        return dayDifference == 1 ? "há 1 dia" : `há ${dayDifference} dias`;
      } else {
        const monthDifference = today.getMonth() - commentDate.getMonth();
        const dayDifference = today.getDay() - commentDate.getDay();
        const timeDifference = dayDifference + monthDifference * 30;

        if (dayDifference < 30) {
          return `há ${timeDifference} dias`;
        } else {
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
  }

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
