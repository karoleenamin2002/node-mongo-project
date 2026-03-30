import jwt from "jsonwebtoken";
import userModel from "..";
import { catchAsync, AppError } from "../utils/errorHandler.js";

export const protect = catchAsync(async (req, res, next) => {
  let { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer")) {
    return next(new AppError(401, "You are not logged in!"));
  }

  const token = authorization.split(" ")[1];
  const decoded = jwt.verify(token, process.env.TOKEN_SECRET);

  const currentUser = await userModel.findById(decoded.id);
  if (!currentUser) {
    return next(new AppError(401, "The user no longer exists."));
  }

  req.user = currentUser;
  next();
});

export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new AppError(403, "You do not have permission"));
    }
    next();
  };
};
