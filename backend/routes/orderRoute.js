import express from "express";
const router = express.Router();
import {
  addOrderItems,
  getOrderByID,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
} from "../controller/orderController.js";
import { protect, admin } from "../middelWare/authMiddleware.js";

router.route("/").post(protect, addOrderItems).get(protect, admin, getOrders);
router.route("/myorders").get(protect, getMyOrders);
router.route("/:id").get(protect, getOrderByID);
router.route("/:id/deliver").put(protect, admin, updateOrderToDelivered);

export default router;
