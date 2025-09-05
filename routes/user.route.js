import { Router } from "express";
import { getUsers, getUser } from "../controllers/user.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const userRouter = Router();

userRouter.get("/", authMiddleware, getUsers);
userRouter.get("/me", authMiddleware, getUser);

export default userRouter;
