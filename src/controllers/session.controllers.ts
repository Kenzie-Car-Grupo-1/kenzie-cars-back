import { Request, Response } from "express";
import SessionServices from "../services/session.service";

export interface IUsersLogin {
  email: string;
  password: string;
}

class SessionControllers {
  static async login(req: Request, res: Response) {
    const userData: IUsersLogin = req.body;
    const response = await SessionServices.login(userData);

    return res.json(response);
  }
}
export default SessionControllers;
