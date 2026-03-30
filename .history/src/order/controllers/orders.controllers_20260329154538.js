import orderModel from "../models/order.model.js";
import cartModel from "../../cart/models/cart.model";

// 🟢 Create Order
export const createOrder = async (req, res) => {
  let { shippingAddress } = req.body;

  let cart = await cartModel.findOne({ user: req.user.id });

  let totalPrice = cart.items.reduce(
    (acc, item) => acc + item.quantity * 100, // مؤقت
    0
  );

  let order = await orderModel.create({
    user: req.user.id,
    items: cart.items,
    totalPrice,
    shippingAddress,
  });

  // clear cart
  cart.items = [];
  await cart.save();

  res.status(201).json({ message: "order created", data: order });
};

// 🟢 Get My Orders
export const getMyOrders = async (req, res) => {
  let orders = await orderModel.find({ user: req.user.id });

  res.status(200).json({ message: "success", data: orders });
};

// 🟢 Cancel Order
export const cancelOrder = async (req, res) => {
  let { id } = req.params;

  let order = await orderModel.findById(id);

  if (!order) {
    return res.status(404).json({ message: "not found" });
  }

  order.status = "cancelled";
  await order.save();

  res.status(200).json({ message: "cancelled", data: order });
};