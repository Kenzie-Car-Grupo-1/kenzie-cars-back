import { Router } from "express";
import UsersController from "../controllers/users.controller";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataValid.middleware";
import { CreateUserSerializer } from "../serializers/users.serializers";

export const usersRouter = Router();

usersRouter.post(
  "",
  ensureDataIsValidMiddleware(CreateUserSerializer),
  UsersController.create
);
