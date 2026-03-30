import express from "express"
import { addToCart, getCart, removeFromCart, updateQty } from "../controllers/cart.controller.js"
// import { auth } from "../../";
//  import middleWare here  
const router = express.Router()

router.get("/",aut,getCart)
router.post("/",auth,addToCart)
router.put("/",auth,updateQty)
router.delete("/",auth,removeFromCart)

export default router 