import productModel from "../models/product.model.js";
import { catchAsync, AppError } from "../../utils/errorHandler.js";
import { successResponse } from "../../utils/apiResponse.js";

export const getAllProducts = catchAsync(async (req, res, next) => {
  const products = await productModel.find();
  return successResponse(res, 200, "Products fetched successfully", products);
});

export const getProductById = catchAsync(async (req, res, next) => {
  const product = await productModel.findById(req.params.id);

  if (!product) {
    return next(new AppError(404, "Product not found"));
  }

  return successResponse(res, 200, "Product fetched successfully", product);
});

export const createProduct = catchAsync(async (req, res, next) => {
  const product = await productModel.create(req.body);
  return successResponse(res, 201, "Product created successfully", product);
});

export const updateProduct = catchAsync(async (req, res, next) => {
  const product = await productModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    },
  );

  if (!product) {
    return next(new AppError(404, "Product not found"));
  }

  return successResponse(res, 200, "Product updated successfully", product);
});

export const deleteProduct = catchAsync(async (req, res, next) => {
  const product = await productModel.findByIdAndDelete(req.params.id);

  if (!product) {
    return next(new AppError(404, "Product not found"));
  }

  return successResponse(res, 200, "Product deleted successfully");
});
