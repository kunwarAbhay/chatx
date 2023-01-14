const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();

const userRouter = require("./routes/userRoutes.js");
const chatRouter = require("./routes/chatRoutes.js");
const globalErrorHandler = require("./controller/errorController.js");
const catchAsync = require("./utils/catchAsync.js");
const AppError = require("./utils/appError.js");

const app = express();

const MONGO_USER = process.env.MONGO_USER;
const MONGO_PASSWORD = process.env.MONGO_PASSWORD;
const DB = `mongodb://127.0.0.1:27017/chatx`;
const PORT = 5000 || process.env.PORT;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("connected to database successfully");
  })
  .catch((err) => {
    console.log("ERROR connecting to database 😥");
    console.log(err);
  });

app.use(cors());
app.use(express.static("public"));
app.use(express.json());
app.get("/", (req, res, next) => {
  res.status(200).json({
    status: "success",
    message: "Connected to backend successfully",
  });
});
app.use("/user", userRouter);
app.use("/chat", chatRouter);

app.get("/*", (req, res, next) => {
  return next(new AppError("Page NOT Found!", 404));
});

app.use(globalErrorHandler);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
