import express from "express";
import {
  getProducts,
  getProductById,
  getSqlProduct,
  getSqlProductById,
} from "../controller/productController.js";
const router = express.Router();
router.route("/sql").get(getSqlProduct);
router.route("/sql/:id").get(getSqlProductById);
router.route("/").get(getProducts);
router.route("/:id").get(getProductById);

export default router;
