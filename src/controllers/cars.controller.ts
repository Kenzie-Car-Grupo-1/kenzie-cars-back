import { Request, Response, response } from "express";
import { CarsServices } from "../services/cars.service";
import { ICarsAdCreate, ICarsAdUpdate } from "../interface/carsAd.interface";

export class CarsController {
  static async create(req: Request, res: Response) {
    const data: ICarsAdCreate = req.body;

    const response = await CarsServices.create(data);

    return res.status(201).json(response);
  }

  static async listAll(req: Request, res: Response) {
    const query = req.query;
    const response = await CarsServices.listAll(query);

    return res.status(200).json(response);
  }

  static async listOne(req: Request, res: Response) {
    const { carId } = req.params;

    const response = await CarsServices.listOne(carId);

    return res.status(200).json(response);
  }

  static async update(req: Request, res: Response) {
    const { carId } = req.params;
    const data: ICarsAdUpdate = req.body;

    const response = await CarsServices.update(data, carId);

    return res.status(200).json(response);
  }

  static async delete(req: Request, res: Response) {
    const { carId } = req.params;

    const response = await CarsServices.delete(carId);

    return res.status(204).json(response);
  }
}
