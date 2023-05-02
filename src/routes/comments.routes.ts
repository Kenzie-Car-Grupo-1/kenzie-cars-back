import { Router } from "express";
import { CommentsController } from "../controllers/comments.controller";
import Middlewares from "../middlewares/auth.middlewares";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataValid.middleware";
import { CreateCommentSerializer } from "../serializers/comments.serializers";

export const commentRoutes = Router();

commentRoutes.post(
  "/:carId",
  Middlewares.Auth,
  ensureDataIsValidMiddleware(CreateCommentSerializer),
  CommentsController.create
);
commentRoutes.get("/:carId", CommentsController.list);
// commentRoutes.get("/:commentId", CommentsController.getDate);
commentRoutes.patch(
  "/:commentId",
  Middlewares.Auth,
  Middlewares.IsCommentOwner,
  CommentsController.update
);
commentRoutes.delete(
  "/:commentId",
  Middlewares.Auth,
  Middlewares.IsCommentOwner,
  CommentsController.delete
);
