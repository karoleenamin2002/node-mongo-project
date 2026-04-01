import express from "express";
import { getUserOrders,createOrder,deleteOrder} from "../controllers/order.controllers.js";
import { protect,authorizeRoles } from "../../middlewares/auth.middleware.js";

const router = express.Router()
router.post("/", protect, createOrder);
router.get("/", protect, getUserOrders);
router.delete("/:id", protect, deleteOrder);
export default router;