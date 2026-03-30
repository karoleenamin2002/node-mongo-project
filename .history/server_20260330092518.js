import dotenv from "dotenv";
import { connectDB } from "./src/config/db.js";
import cartRouter from "./src/cart/routes/cart.routes.js"
import express from "express";
import userRoute from "./src/users/routes/user.route.js";
import productRoute from "./src/products/routers/product.routes.js";
import { AppError, catchAsync } from "./src/utils/errorHandler.js";

dotenv.config();
const app = express();
app.use(express.json());
connectDB();

app.use("/cart",cartRouter)
app.use("/users", userRoute);
app.use("/products", productRoute);

app.all(/(.*)/, (req, res, next) => {
  next(new AppError(404, `Can't find ${req.originalUrl} on this server!`));
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const status = err.status || "error";

  res.status(statusCode).json({
    status,
    message: err.message,
  });
});

const PORT = process.env.PORT || 3000;
console.log(PORT);

app.listen(PORT, () => {
  console.log(`Server is started on port ${PORT}...`);
});
