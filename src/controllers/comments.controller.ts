import { Request, Response } from "express";
import { CommentsService } from "./../services/comments.service";
import {
  ICommentCreate,
  ICommentUpdate,
} from "../interface/comments.interface";

export class CommentsController {
  static async create(req: Request, res: Response) {
    const data: ICommentCreate = req.body;
    const { carId } = req.params;
    const userId: string = req.user.id;

    const response = await CommentsService.create(data, carId, userId);

    return res.status(201).json(response);
  }

  static async list(req: Request, res: Response) {
    const { carId } = req.params;

    const response = await CommentsService.list(carId);

    return res.status(200).json(response);
  }

  static async getDate(req: Request, res: Response) {
    const { commentId } = req.params;

    const response = await CommentsService.getOneDate(commentId);

    return res.status(200).json(response);
  }

  static async update(req: Request, res: Response) {
    const data: ICommentUpdate = req.body;
    const { commentId } = req.params;

    const response = await CommentsService.update(data, commentId);

    return res.status(200).json(response);
  }

  static async delete(req: Request, res: Response) {
    const { commentId } = req.params;

    const response = await CommentsService.delete(commentId);

    return res.status(204).json(response);
  }
}
