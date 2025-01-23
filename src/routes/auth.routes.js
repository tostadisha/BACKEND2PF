import { Router } from "express";
import { passportCall } from "../utils/passportCall.js";
import { login, register, logout } from "../controllers/auth.controller.js";

const router = Router();

router.post("/login", passportCall("local"), login);
router.post("/register", passportCall("register"), register);
router.get("/logout", logout);

export default router;
