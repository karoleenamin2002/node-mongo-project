import express from "express"
import { getCart } from "../controllers/cart.controller"
const router = express.Router()

router.get("/",getCart)