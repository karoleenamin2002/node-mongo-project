import express from "express"
import { addToCart, getCart, removeFromCart, updateQty } from "../controllers/cart.controller.js"
import { auth } from "../middleware/auth.middleware.js";
const router = express.Router()

router.get("/",auth,getCart)
router.post("/",auth,addToCart)
router.put("/",auth,updateQty)
router.delete("/",auth,removeFromCart)
// router.get("/",getCart)

export defula