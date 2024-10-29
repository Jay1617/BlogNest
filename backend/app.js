// app.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { dbConnection } from "./database/dbConnection.js";
import { errorMiddleware } from "./middlewares/error.js";
import userRouter from "./routes/userRouter.js";
import blogRouter from "./routes/blogRouter.js";
import commentRouter from "./routes/commentRouter.js"; 
import fileUpload from "express-fileupload";

const app = express();
dotenv.config({ path: "./config/config.env" });

app.use(
  cors({
    origin: ["http://localhost:5174", "http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/temp/",
  })
);

// Register Routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/blog", blogRouter);
app.use("/api/v1/comments", commentRouter);

dbConnection();

app.use(errorMiddleware);

export default app;
