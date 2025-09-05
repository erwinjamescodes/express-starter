import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import {
  createComment,
  getCommentsByPost,
  updateComment,
  deleteComment,
} from "../controllers/comment.controller.js";

const commentRouter = Router();

commentRouter.post("/post/:postId", authMiddleware, createComment);
commentRouter.get("/post/:postId", authMiddleware, getCommentsByPost);
commentRouter.put("/:id", authMiddleware, updateComment);
commentRouter.delete("/:id", authMiddleware, deleteComment);

export default commentRouter;
