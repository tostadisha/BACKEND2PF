import { Router } from "express";
import passport from "passport";
import { authorization } from "../middlewares/authorization.js";
import {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/products.controller.js";

const router = Router();

router.use(passport.authenticate("jwt", { session: false }));

router.get("/", authorization(["user", "admin"]), getAllProducts);
router.get("/:id", authorization(["user", "admin"]), getProductById);
router.post("/", authorization(["admin"]), addProduct);
router.put("/:id", authorization(["admin"]), updateProduct);
router.delete("/:id", authorization(["admin"]), deleteProduct);

export default router;
