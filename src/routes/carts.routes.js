import { Router } from "express";
import passport from "passport";
import { authorization } from "../middlewares/authorization.js";
import {
  addProductToCart,
  createCart,
  getCartById,
} from "../controllers/carts.controller.js";

const router = Router();

router.use(passport.authenticate("jwt", { session: false }));

router.post("/", authorization(["user"]), createCart);
router.post("/product/:productId", authorization(["user"]), addProductToCart);
router.get("/:id", authorization(["user"]), getCartById);
export default router;
