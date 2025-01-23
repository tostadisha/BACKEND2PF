import { Router } from "express";
import passport from "passport";
import { authorization } from "../middlewares/authorization.js";
import { addProductToCart } from "../controllers/carts.controller.js";

const router = Router();

router.use(passport.authenticate("jwt", { session: false }));

router.post(
  "/:cartId/products/:productId",
  authorization(["user", "admin"]),
  addProductToCart
);

export default router;
