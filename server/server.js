import express from "express";
import { validationResult } from "express-validator";
import userModel from "./models/userModel.js";
import { userValidator } from "./validators/userValidator.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import env from "dotenv";
import chalk from "chalk";

env.config();
const { PORT, DB_PASS, DB_NAME } = process.env;
mongoose
  .connect(
    `mongodb+srv://dreamth:${DB_PASS}@testclaster.jnzonwj.mongodb.net/disearch?retryWrites=true&w=majority&appName=testClaster`,
  )
  .then(() =>
    console.log(
      chalk.black.bgGreen(`${new Date()}`),
      chalk.green("Connected to the database..."),
    ),
  )
  .catch((err) => console.error(`${new Date()} ${err}`));
const app = express();
app.use(express.json());
app.get("/", async (req, res) => {
  console.log(req.body);
  res.status(200).send("meme2");
});
app.post("/auth/reg", userValidator, async (req, res) => {
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
    console.log(chalk.bgRed.black(`${new Date()} ERROR\n`), err);
    res.status(500).json({
      message: "Something went wrong, please try again...",
    });
  }
});
app.listen(PORT || 1337, (err) => {
  if (err) {
    return console.error(chalk.black.bgRed(new Date()), err);
  }
  console.log(chalk.green.bold("Server is OK!"));
});
