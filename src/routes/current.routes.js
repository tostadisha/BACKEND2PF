import { Router } from "express";
import passport from "passport";
import { authorization } from "../middlewares/authorization.js";
import { current as currentStrategy } from "../controllers/auth.controller.js";
const router = Router();

router.use(passport.authenticate("jwt", { session: false }));

router.get("/", authorization(["user", "admin"]), currentStrategy);

export default router;
