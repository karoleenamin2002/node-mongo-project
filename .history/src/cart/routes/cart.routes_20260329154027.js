import express from "express"
import { addToCart, getCart, removeFromCart, updateQty } from "../controllers/cart.controller.js"
// import { auth } from "../../";
//  import middleWare here  
const router = express.Router()

router.get("/",getCart)
router.post("/",addToCart)
router.put("/",updateQty)
router.delete("/",removeFromCart)

export default router 