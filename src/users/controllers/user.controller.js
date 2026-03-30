import userModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { catchAsync, AppError } from "../../utils/errorHandler.js"; 
import { successResponse } from "../../utils/apiResponse.js";

export const SignUp = catchAsync(async (req, res, next) => {
  const user = await userModel.create(req.body);

  user.password = undefined;

  return successResponse(res, 201, "User registered successfully", user);
});

export const Login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body; 

  const user = await userModel.findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return next(new AppError(401, "Invalid Email or Password"));
  }

  const token = jwt.sign(
    { id: user._id, username: user.name, role: user.role },
    process.env.TOKEN_SECRET,
    { expiresIn: "1h" },
  );

  const refresh = jwt.sign({ id: user._id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "1y",
  });

  return res.status(200).json({
    status: "success",
    message: "Logged in successfully",
    token,
    refresh,
  });
});

export const RefreshToken = catchAsync(async (req, res, next) => {
  const { refresh } = req.body;

  if (!refresh) return next(new AppError(400, "Refresh token is required"));

  const decode = jwt.verify(refresh, process.env.REFRESH_TOKEN_SECRET);

  const user = await userModel.findById(decode.id);
  if (!user) {
    return next(new AppError(404, "User no longer exists"));
  }

  const token = jwt.sign(
    { id: user._id, username: user.name, role: user.role },
    process.env.TOKEN_SECRET,
    { expiresIn: "1h" },
  );

  return successResponse(res, 200, "Token refreshed successfully", { token });
});
