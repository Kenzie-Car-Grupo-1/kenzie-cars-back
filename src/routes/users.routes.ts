import { Router } from "express";
import UsersController from "../controllers/users.controller";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataValid.middleware";
import {
  CreateUserSerializer,
  UpdateUserSerializer,
} from "../serializers/users.serializers";
import validQueryPaginationMiddleware from "../middlewares/pagination.middleware";
import Middlewares from "../middlewares/auth.middlewares";

export const usersRouter = Router();

usersRouter.post(
  "",
  ensureDataIsValidMiddleware(CreateUserSerializer),
  UsersController.create
);
usersRouter.get(
  "/:id/cars",
  validQueryPaginationMiddleware,
  UsersController.listAllCars
);
usersRouter.get("/:id", UsersController.listOne);
usersRouter.patch(
  "",
  Middlewares.Auth,
  ensureDataIsValidMiddleware(UpdateUserSerializer),
  UsersController.update
);
usersRouter.delete("", Middlewares.Auth, UsersController.delete);
