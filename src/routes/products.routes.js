import { Router } from "express";
import passport from "passport";
import { authorization } from "../middlewares/authorization";

const router = Router();

router.use(passport.authenticate("jwt", { session: false }));

router.get("/", authorization(["user", "admin"]), getProducts);
router.get("/", authorization(["user", "admin"]), getProduct);
router.post("/", authorization(["admin"]), addProduct);
router.put("/:id", authorization(["admin"]), updateProduct);
router.delete("/:id", authorization(["admin"]), deleteProduct);
