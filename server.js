import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./src/config/db.js";
import userRoute from "./src/routes/user.route.js";
import productRoute from "./src/routes/product.route.js";
import { AppError } from "./src/utils/errorHandler.js";

dotenv.config();

const app = express();
app.use(express.json());

connectDB();

app.use("/api/v1/users", userRoute);
app.use("/api/v1/products", productRoute);

app.all("*", (req, res, next) => {
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

app.listen(PORT, () => {
  console.log(`Server is started on port ${PORT}...`);
});
