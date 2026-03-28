import { Router } from "express";
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";

const router = Router();
const adminOnly = [protect, authorizeRoles("admin")];

router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.post("/", adminOnly, createProduct);
router.put("/:id", adminOnly, updateProduct);
router.delete("/:id", adminOnly, deleteProduct);

export default router;
