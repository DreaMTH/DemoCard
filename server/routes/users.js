import express from "express";
import checkAuth from "../utils/checkAuth.js";
import userModel from "../models/userModel.js";

const route = express.Router();

route.get("/", checkAuth, async (req, res) => {
  const users = await userModel.find();
  if (!users) {
    return res
      .status(500)
      .json({ message: "Some errors occure, please, try again later." });
  } else {
    res.status(200).json(users);
  }
});

export default route;
