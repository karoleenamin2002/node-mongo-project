import { successResponse } from "../../utils/apiResponse.js";
import { AppError, catchAsync } from "../../utils/errorHandler.js";
import cartModel from "../models/cart.model.js";


export const getCart = catchAsync(async (req, res, next) => {
  let cart = await cartModel
    .findOne({ user: req.user.id })
    .populate("items.product");

  if (!cart) {
    return successResponse(res, 200, "Cart is empty", {
      items: [],
      totalPrice: 0,
    });
  }

  const totalPrice = cart.items.reduce((acc, item) => {
    return acc + item.quantity * item.product.price;
  }, 0);

  return successResponse(
    res,
    200,
    "Cart Products fetched successfully",
    {
      cart,
      totalPrice,
    }
  );
});

// export const getCart = catchAsync(async (req, res,next) => {
//   let cart = await cartModel
//     .findOne({ user: req.user.id })
//     .populate("items.product");
//     if (!cart) {
//   return successResponse(res, 200, "Cart is empty", { items: [] });
// }
//     return successResponse(res, 200, "Cart Products fetched successfully", cart)
// })


export const addToCart = catchAsync(async (req, res,next) => {
  let { productId, quantity } = req.body;
  quantity = quantity || 1;
  let cart = await cartModel.findOne({ user: req.user.id }).populate("items.product");
  if (!cart) {
    cart = await cartModel.create({
      user: req.user.id,
      items: [{ product: productId, quantity }],
    });
  } else {
    let item = cart.items.find(
      (el) => el.product.toString() === productId
    );
    if (item) {
      item.quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }
    await cart.save();
  }
    return successResponse(res, 200, "Your Product Added successfully",cart);
  
})

export const removeFromCart = catchAsync(async (req, res,next) => {
  let { productId } = req.body;

  let cart = await cartModel.findOne({ user: req.user.id });
  if (!cart) {
  return next(new AppError(404, "Cart not found"));
}

  cart.items = cart.items.filter(
    (el) => el.product.toString() !== productId
  );

  await cart.save();
    return successResponse(res, 200, "Your Product Removed From Cart Successfully", cart);
  
})

export const updateQty =catchAsync( async (req, res,next) => {
  let { productId, quantity } = req.body;

  let cart = await cartModel.findOne({ user: req.user.id });
  if (!cart) {
  return next(new AppError(404, "Cart not found"));
}
  let item = cart.items.find(
    (el) => el.product.toString() === productId
  );
  if (!item) {
        return next(new AppError(404, "Product not found"));
  }

  if (quantity <= 0) {
  cart.items = cart.items.filter(
    (el) => el.product.toString() !== productId
  );
} else {
  item.quantity = quantity;
}
  await cart.save();
  return successResponse(res, 200, "Products Updated successfully", cart);
})