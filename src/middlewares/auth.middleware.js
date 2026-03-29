import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";

export const auth = async (req, res, next) => {
  let { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: "unauthenticated" });
  }

  try {
    let decode = jwt.verify(authorization, process.env.TOKEN_SECRET);
    let user = await userModel.findById(decode.id);
    if (!user) {
      return res.status(404).json({ message: "Not Found" });
    }
    req.role = user.role;
    next();
  } catch (err) {
    res.status(500).json({ err });
  }
};

export const allowedTo = (...role) => {
  return (req, res, next) => {
    if (!role.includes(req.role)) {
      return res.status(403).json({ message: "You are not Authorized" });
    }
    next();
  };
};
