import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";
import errorMiddleware from "./middleware/error.middleware.js";
import postRouter from "./routes/post.route.js";
import commentRouter from "./routes/comment.route.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(errorMiddleware);

app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/posts", postRouter);
app.use("/comments", commentRouter);

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@express-demo.6xstsxg.mongodb.net/?retryWrites=true&w=majority&appName=express-demo`
  )
  .then(() => {
    app.listen(3000, () => {
      console.log("server running on localhost:3000");
    });
  })
  .catch((err) => {
    console.log(err);
  });
