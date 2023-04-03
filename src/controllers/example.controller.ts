import { Request, Response } from "express";

class ExampleController {
  static async create(req: Request, res: Response) {
    // const response =
    // return res.status(201).json(response);
  }

  static async listOne(req: Request, res: Response) {}

  static async update(req: Request, res: Response) {}

  static async delete(req: Request, res: Response) {}
}

export default ExampleController;
