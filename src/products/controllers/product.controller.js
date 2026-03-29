import productModel from "../models/product.model.js";
import { successResponse, errorResponse } from "../utils/apiResponse.js";

export const getAllProducts = async (req, res) => {
  try {
    const products = await productModel.find();
    return successResponse(res, 200, "Products fetched successfully", products);
  } catch (err) {
    return errorResponse(res, 500, err.message);
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id);
    if (!product) return errorResponse(res, 404, "Product not found");
    return successResponse(res, 200, "Product fetched successfully", product);
  } catch (err) {
    return errorResponse(res, 500, err.message);
  }
};

export const createProduct = async (req, res) => {
  try {
    const product = await productModel.create(req.body);
    return successResponse(res, 201, "Product created successfully", product);
  } catch (err) {
    return errorResponse(res, 400, err.message);
  }
};

export const updateProduct = async (req, res) => {
  try {
    const product = await productModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );
    if (!product) return errorResponse(res, 404, "Product not found");
    return successResponse(res, 200, "Product updated successfully", product);
  } catch (err) {
    return errorResponse(res, 400, err.message);
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await productModel.findByIdAndDelete(req.params.id);
    if (!product) return errorResponse(res, 404, "Product not found");
    return successResponse(res, 200, "Product deleted successfully");
  } catch (err) {
    return errorResponse(res, 500, err.message);
  }
};
