import express from "express";
import chalk from "chalk";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import { userValidator } from "../validators/userValidator.js";
import checkAuth from "../utils/checkAuth.js";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import { Mongoose, MongooseError } from "mongoose";
const authRouter = express.Router();

authRouter.post("/registration", userValidator, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }
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
});
authRouter.post("/login", async (req, res) => {
  try {
    if (!req.body.password) {
      return res.status(400).json({
        message: "Password field is empty",
      });
    }
    const email = req.body.email;
    const password = req.body.password;
    const user = await userModel.findOne({ email: email });
    if (!user) {
      return res.status(400).json({
        message: "Cannot find user with this email.",
      });
    }
    const passwordCompare = await bcrypt.compare(password, user._doc.password);
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
});
authRouter.get("/profile/me", checkAuth, (req, res) => {
  try {
    res.status(200).json({ success: true });
  } catch (err) {}
});

export default authRouter;
