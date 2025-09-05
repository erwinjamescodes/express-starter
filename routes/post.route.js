import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
} from "../controllers/post.controller.js";

const postRouter = Router();

postRouter.post("/", authMiddleware, createPost);
postRouter.get("/", authMiddleware, getAllPosts);
postRouter.get("/:id", authMiddleware, getPostById);
postRouter.put("/:id", authMiddleware, updatePost);
postRouter.delete("/:id", authMiddleware, deletePost);

export default postRouter;
