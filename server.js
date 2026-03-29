import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./src/config/db.js";
import userRoute from "./src/routes/user.route.js";

dotenv.config();

const app = express();
app.use(express.json());

connectDB();

app.use("/users", userRoute);
app.use((err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";
  res.status(statusCode).json({ message });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server is started...");
});
