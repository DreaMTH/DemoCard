import express from "express";
import chalk from "chalk";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import {
  userValidator,
  userLoginValidator,
} from "../validators/userValidator.js";
import checkAuth from "../utils/checkAuth.js";
import jwt from "jsonwebtoken";
import handleValidationErrors from "../utils/handleValidationErrors.js";
const authRouter = express.Router();

authRouter.post(
  "/registration",
  userValidator,
  handleValidationErrors,
  async (req, res) => {
    try {
      const salt = await bcrypt.genSalt(10);
      const password = req.body.password;
      const hashPassword = await bcrypt.hash(password, salt);
      const doc = new userModel({
        email: req.body.email,
        name: req.body.name,
        password: hashPassword,
      });
      const user = await doc.save();
      const token = jwt.sign({ id: user._id }, "token");
      res.json({ ...user, token });
    } catch (err) {
      console.error(chalk.bgRed.black(`${new Date()} ERROR\n`), err);
      if (err.code === 11000) {
        return res.status(400).json({
          message: "Profile with this email already exists",
        });
      }
      res.status(500).json({
        message: "Something went wrong, please try again...",
      });
    }
  },
);
authRouter.post(
  "/login",
  userLoginValidator,
  handleValidationErrors,
  async (req, res) => {
    try {
      const email = req.body.email;
      const password = req.body.password;
      const user = await userModel.findOne({ email: email });
      if (!user) {
        return res.status(400).json({
          message: "Cannot find user with this email.",
        });
      }
      const passwordCompare = await bcrypt.compare(
        password,
        user._doc.password,
      );
      if (!passwordCompare) {
        return res.status(400).json({
          message: "Incorrect password",
        });
      }
      const token = jwt.sign({ id: user._id }, "token");
      res.status(200).json({ ...user, token });
    } catch (err) {
      console.error(chalk.black.bgRed("ERROR" + new Date()), err);
      res.status(500).json({
        message: "Something went wrong, please try again.",
      });
    }
  },
);
authRouter.get("/profile/me", checkAuth, async (req, res) => {
  try {
    const user = await userModel.findById(req.userId);
    if (!user) {
      return res.status(404).json({
        message: "There are no such user",
      });
    }
    const { ...userData } = user._doc;
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json({
      message: "Unexpected error occured, please, try again later.",
    });
  }
});

export default authRouter;
