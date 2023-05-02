import { Router } from "express";
import UsersController from "../controllers/users.controller";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataValid.middleware";
import {
  CreateUserSerializer,
  UpdateUserSerializer,
  resetPasswordSerializer,
  sendEmailResetSerializer,
} from "../serializers/users.serializers";
import validQueryPaginationMiddleware from "../middlewares/pagination.middleware";
import Middlewares from "../middlewares/auth.middlewares";

export const userRoutes = Router();

userRoutes.post(
  "",
  ensureDataIsValidMiddleware(CreateUserSerializer),
  UsersController.create
);
userRoutes.get(
  "/:id/cars",
  validQueryPaginationMiddleware,
  UsersController.listAllCars
);
userRoutes.get("/:id", UsersController.listOne);
userRoutes.patch(
  "",
  Middlewares.Auth,
  ensureDataIsValidMiddleware(UpdateUserSerializer),
  UsersController.update
);
userRoutes.delete("", Middlewares.Auth, UsersController.delete);

userRoutes.post(
  "/resetPassword",
  ensureDataIsValidMiddleware(sendEmailResetSerializer),
  UsersController.sendResetEmailPassword
);

userRoutes.patch(
  "/resetPassword/:token",
  ensureDataIsValidMiddleware(resetPasswordSerializer),
  UsersController.resetPassword
);
