// routes/commentRouter.js
import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { createComment, getComments } from "../controllers/commentController.js";

const router = express.Router();

router.post("/add", isAuthenticated, createComment);
router.get("/:blogId", getComments);

export default router;
