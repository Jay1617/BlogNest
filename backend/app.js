import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { dbConnection } from "./Database/dbConnection.js";
import { errorMiddleware } from "./middlewares/error.js";
import userRouter from "./routes/userRouter.js";
import blogRouter from "./routes/blogRouter.js";
import fileUpload from "express-fileupload";

const app = express();
dotenv.config({ path: "./config/config.env" });

app.use(
  cors({
    origin: "http://localhost:5173", // Frontend URL (adjust if needed)
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // Allow credentials (cookies, etc.)
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

app.use("/api/v1/user", userRouter);
app.use("/api/v1/blog", blogRouter);

dbConnection();

app.use(errorMiddleware);

export default app;
