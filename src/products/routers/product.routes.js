import { Router } from "express";
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.js";

// import { protect } from "../../middlewares/auth.middleware.js";
// import { authorizeRoles } from "../../middlewares/role.middleware.js";

const router = Router();

const adminOnly = [];

router.get("/", getAllProducts);
router.get("/:id", getProductById);

router.post("/", ...adminOnly, createProduct);
router.put("/:id", ...adminOnly, updateProduct);
router.delete("/:id", ...adminOnly, deleteProduct);

export default router;
