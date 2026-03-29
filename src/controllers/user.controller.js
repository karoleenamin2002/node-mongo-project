import userModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { catchAsync } from "../utils/catchAsync.js";

export const SignUp = catchAsync(async (req, res) => {
  let { name, email, password, role } = req.body;
  let user = await userModel.create({
    name,
    email,
    password,
    role,
  });
  res.status(201).json({ message: "Success", data: user });
});

export const Login = catchAsync(async (req, res) => {
  let { name, password } = req.body;
  let user = await userModel.findOne({ name });
  if (!user || (await !bcrypt.compare(password, user.password))) {
    return res.status(404).json({ message: "Invalid UserName or Password " });
  }

  let token = jwt.sign(
    {
      id: user._id,
      username: user.name,
      role: user.role,
    },
    process.env.TOKEN_SECRET,
    {
      expiresIn: "1h",
    },
  );

  let refresh = jwt.sign(
    {
      id: user._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: "1y",
    },
  );
  res.status(200).json({ message: "success", token, refresh });
});

export const RefreshToken = catchAsync(async (req, res) => {
  let { refresh } = req.body;
  let decode = jwt.verify(refresh, process.env.REFRESH_TOKEN_SECRET);

  let user = await userModel.findById(decode.id);
  if (!user) {
    res.status(404).json({ message: "User not found" });
  }

  let token = jwt.sign(
    {
      id: user._id,
      username: user.name,
      role: user.role,
    },
    process.env.TOKEN_SECRET,
    {
      expiresIn: "1h",
    },
  );
  res.status(200).json({ message: "success", token });
});
