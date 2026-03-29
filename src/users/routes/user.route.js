import express from "express";
import { SignUp, Login, RefreshToken } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/login", Login);
router.post("/signup", SignUp);
router.post("/refresh", RefreshToken);

export default router;
