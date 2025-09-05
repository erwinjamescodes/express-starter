import { Router } from "express";
import { getUsers, getUser } from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.get("/", getUsers);
userRouter.get("/me", getUser);

export default userRouter;
