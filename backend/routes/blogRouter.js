import express from "express";
import {
  blogpost,
  deleteBlog,
  getAllBlogs,
  getSingleBlog,
  getMyBlogs,
  updateBlog,
} from "../controllers/blogController.js";
import { isAuthenticated, isauthorized } from "../middlewares/auth.js";

const router = express.Router();

router.post("/post", isAuthenticated, isauthorized("Author"), blogpost);
router.delete(
  "/delete/:id",
  isAuthenticated,
  isauthorized("Author"),
  deleteBlog
);
router.get("/all", getAllBlogs);
router.get("/singleblog/:id", isAuthenticated, getSingleBlog);
router.get("/myblogs", isAuthenticated, isauthorized("Author"), getMyBlogs);
router.put("/update/:id", isAuthenticated, isauthorized("Author"), updateBlog);

export default router;
