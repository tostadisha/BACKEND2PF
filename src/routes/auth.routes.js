import { Router } from "express";
import { passportCall } from "../utils/passportCall.js";
import {
  login,
  register,
  logout,
  current,
} from "../controllers/auth.controller.js";

const router = Router();

router.post("/login", passportCall("login"), login);
router.post("/register", passportCall("register"), register);
router.get("/logout", logout);

export default router;
