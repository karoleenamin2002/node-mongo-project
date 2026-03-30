import express from "express";
import {
  createOrder,
  getMyOrders,
  cancelOrder,
} from "../controllers/orderController.js";

import { auth, allowedTo } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", auth, createOrder);
router.get("/", auth, getMyOrders);
router.patch("/:id/cancel", auth, cancelOrder);

export default router;