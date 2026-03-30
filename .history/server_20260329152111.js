import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./src/config/db.js";
import cartRouter from "./src/cart/routes/cart.routes.js"
dotenv.config();

const app = express();
app.use(express.json());
app.
connectDB();

const PORT = process.env.PORT || 3000;
console.log(PORT);

app.listen(PORT, () => {
  console.log("Server is started...");
});
