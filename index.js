import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRouter from "./routes/auth.route.js";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/auth", authRouter);

app.get("/", (req, res) => {
  console.log(req);
  res.send("Hello World");
});

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
