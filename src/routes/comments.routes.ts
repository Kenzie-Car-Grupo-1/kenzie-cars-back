import { Router } from "express";
import { CommentsController } from "../controllers/comments.controller";
import Middlewares from "../middlewares/auth.middlewares";

export const commentRoutes = Router();

commentRoutes.post("", Middlewares.Auth, CommentsController.create);
commentRoutes.get("", CommentsController.list);
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
