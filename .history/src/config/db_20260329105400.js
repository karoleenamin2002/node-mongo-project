import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.Mongo);
    console.log("MongoDB connected");
    console.log(process.env.Mongo);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};