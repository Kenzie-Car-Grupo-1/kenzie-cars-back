import AppDataSource from "../data-source";
import jwt from "jsonwebtoken";
import AppError from "../errors/appError";
import { Request, Response, NextFunction } from "express";
import "dotenv/config";
import { CarAd } from "../entities/cars.entity";
import { Users } from "../entities/user.entity";

class Middlewares {
  static async Auth(req: Request, res: Response, next: NextFunction) {
    let token = req.headers.authorization;

    if (!token) {
      throw new AppError("Invalid token", 401);
    }

    token = token.split(" ")[1];

    jwt.verify(token, process.env.SECRET_KEY!, (error, decoded: any) => {
      if (error) {
        throw new AppError(error.message, 401);
      }
      req.user = {
        id: decoded.sub,
      };
      return next();
    });
  }

  static async EnsureIsSaleman(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const userRepository = AppDataSource.getRepository(Users);

    const verifyUserType = await userRepository.findOne({
      where: { id: req.user.id },
    });
    if (!verifyUserType!.isSalesman) {
      throw new AppError("You can not do that because you not a saleman!", 401);
    }

    return next();
  }

  static async IsOwner(req: Request, res: Response, next: NextFunction) {
    const carsRepository = AppDataSource.getRepository(CarAd);

    const carsAD = await carsRepository.findOne({
      where: { id: req.params.id },
      relations: { user: true },
    });

    if (carsAD?.user.id !== req.user.id) {
      throw new AppError(
        "You can not do that because you not a owner of this car",
        401
      );
    }

    return next();
  }

  static async Example(req: Request, res: Response, next: NextFunction) {}
}
export default Middlewares;
