import express from "express"
import { addToCart, getCart, removeFromCart, updateQty } from "../controllers/cart.controller.js"
const router = express.Router()

router.get("/",getCart)
router.post("/",addToCart)
router.put("/",updateQty)
router.get("/",removeFromCart)
router.get("/",getCart)