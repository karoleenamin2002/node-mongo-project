import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter product name"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Please enter product description"],
    },
    price: {
      type: Number,
      required: [true, "Please enter product price"],
      min: [0, "Price cannot be less than zero"],
    },
    category: {
      type: String,
      required: [true, "Please select a category for this product"],
    },
    stock: {
      type: Number,
      default: 0,
      min: [0, "Stock cannot be less than zero"],
    },
    image: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Product", productSchema);
