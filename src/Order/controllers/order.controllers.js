import{orderModel}from"../models/order.models.js";
import {catchAsync,AppError } from "../../utils/errorHandler.js";
import { successResponse} from "../../utils/apiResponse.js";

export const createOrder = catchAsync(async (req, res, next) => {
  const { productId, quantity, address, city, status } = req.body;
  const userId = req.user._id;

  let order = await orderModel.findOne({ user: userId });
  if (!order.items) {
    order = await orderModel.create({
      items: [{ product: productId, quantity }],
      address,
      city,
      status: status || "PENDING",
      user: userId,
    });
  } else {
    let item = order.items.find(
      (e) => e.product.toString() === productId
    );
    if (item) {
      item.quantity += quantity;
    } else {
      order.items.push({ product: productId, quantity });
    }
    await order.save();
  }

  successResponse(res, 201, "Order created successfully", order);
});

export const getUserOrders = catchAsync(async (req, res, next) => {
  const userId = req.user._id;
  const orders = await orderModel.find({ user: userId }).populate("items.product");
  if(!orders){
    return next(new AppError(404,"No orders found for this user"));
  }
  successResponse(res, 200, "User orders fetched successfully", orders);
});



export const deleteOrder = catchAsync(async (req, res, next) => {
  const orderId = req.params.id;
  const userId = req.user._id;
    const order = await orderModel.findOneAndDelete({ _id: orderId, user: userId });
    if (!order) {
      return next(new AppError(404,"Order not found or unauthorized"));
    }
    successResponse(res, 200, "Order deleted successfully", order);
});
