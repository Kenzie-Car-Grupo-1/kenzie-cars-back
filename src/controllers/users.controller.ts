import { Request, Response } from "express";
import UsersService from "../services/users.service";
import { ICreateUser } from "../interface/users.interface";

class UsersController {
  static async create(req: Request, res: Response) {
    const data = req.body;
    const response: any = await UsersService.create(data);
    return res.status(201).json(response);
  }

  static async listOne(req: Request, res: Response) {
    const userId = req.params.id;
    const response: ICreateUser = await UsersService.listOne(userId);

    return res.status(201).json(response);
  }

  static async listAllCars(req: Request, res: Response) {
    const userId = req.params.id;
    const query = req.query;
    const response: any = await UsersService.listAllCars(userId, query);

    return res.status(201).json(response);
  }

  static async update(req: Request, res: Response) {
    const userData = req.body;
    const userId: string = req.user.id;
    const response: any = await UsersService.update(userData, userId);

    return res.status(200).json(response);
  }

  static async delete(req: Request, res: Response) {
    const userId = req.user.id;
    const response = await UsersService.delete(userId);

    return res.status(204).json(response);
  }
}

export default UsersController;
