import express from "express"
import { addToCart, getCart, removeFromCart, updateQty } from "../controllers/cart.controller.js"
import protect from "../../middlewares/auth.middleware.js"
const router = express.Router()
router.get("/",protect,getCart)
router.post("/",auth,addToCart)
router.put("/",auth,updateQty)
router.delete("/",auth,removeFromCart)

export default router 