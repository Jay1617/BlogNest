import {register, login, logout, getMyProfile, allAuthors} from "../controllers/userController.js";
import express from "express";
import {isAuthenticated, isauthorized,} from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", isAuthenticated , logout);
router.get("/myprofile", isAuthenticated , getMyProfile);
router.get("/authors", allAuthors);

export default router;