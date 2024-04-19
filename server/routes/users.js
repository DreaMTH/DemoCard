import express from "express";
import checkAuth from "../utils/checkAuth.js";
import userModel from "../models/userModel.js";
import { Mongoose, isValidObjectId } from "mongoose";

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
route.get("/:id", checkAuth, async (req, res) => {
  if (!isValidObjectId(req.params.id)) {
    return res.status(404).json({ message: "Invalid user id." });
  }
  const user = await userModel.findById({ _id: req.params.id });
  if (!user) {
    return res.status(404).json({ message: "No user with such id" });
  } else {
    res.status(200).json(user);
  }
});

route.post("/updateDescription", checkAuth, async (req, res) => {
  const user = await userModel.findByIdAndUpdate(req.userId, {
    description: req.body.description,
  });
  if (!user) {
    return res.status(404).json({ message: "Invalid request" });
  } else {
    res.status(200).json({ message: "success" });
  }
});

route.post("/updateInterests", checkAuth, async (req, res) => {
  try {
    const user = await userModel.findByIdAndUpdate(req.userId, {
      interests: req.body.interests,
    });
    if (!user) {
      return res.status(404).json({ message: "Invalid request" });
    } else {
      res.status(200).json({ message: "successs" });
    }
  } catch (err) {
    return res.status(400).json({ message: "Wrong data" });
  }
});

export default route;
