import express from "express"
import { addToCart, getCart, updateQty } from "../controllers/cart.controller.js"
const router = express.Router()

router.get("/",getCart)
router.post("/",addToCart)
router.put("/",updateQty)
router.get("/",remo)
router.get("/",getCart)