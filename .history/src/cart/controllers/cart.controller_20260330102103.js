import { catchAsync } from "../../utils/errorHandler.js";
import cartModel from "../models/cart.model.js";
export const getCart = catchAsync(async (req, res) => {
    
  let cart = await cartModel
    .findOne({ user: req.user.id })
    .populate("items.product");

  res.status(200).json({ message: "success", data: cart });
})

export const addToCart = catch


export const removeFromCart = async (req, res) => {
  let { productId } = req.body;

  let cart = await cartModel.findOne({ user: req.user.id });

  cart.items = cart.items.filter(
    (el) => el.product.toString() !== productId
  );

  await cart.save();

  res.status(200).json({ message: "removed", data: cart });
};


export const updateQty = async (req, res) => {
  let { productId, quantity } = req.body;

  let cart = await cartModel.findOne({ user: req.user.id });

  let item = cart.items.find(
    (el) => el.product.toString() === productId
  );

  if (item) {
    item.quantity = quantity;
  }

  await cart.save();

  res.status(200).json({ message: "updated", data: cart });
};