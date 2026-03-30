import express from "express";
import {
  createOrder,
  getMyOrders,
  cancelOrder,
} from "../controllers/orders.controllers.js";

import { auth} from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", auth, createOrder);
router.get("/", auth, getMyOrders);
router.patch("/:id/cancel", auth, cancelOrder);

export default router;