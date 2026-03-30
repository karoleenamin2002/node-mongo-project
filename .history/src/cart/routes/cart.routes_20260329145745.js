import express from "express"
import { addToCart, getCart } from "../controllers/cart.controller.js"
const router = express.Router()

router.get("/",getCart)
router.get("/:",addToCart)
router.get("/",getCart)
router.get("/",getCart)
router.get("/",getCart)