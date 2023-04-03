import AppDataSource from "../data-source";
import jwt from "jsonwebtoken";
import AppError from "../errors/appError";
import { Request, Response, NextFunction } from "express";
import "dotenv/config";

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
  static async Example(req: Request, res: Response, next: NextFunction) {}
}
export default Middlewares;
