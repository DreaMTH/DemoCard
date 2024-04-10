import express from "express";
import { userModel } from "./models/userModel.js";
import { authValidator } from "./validators/auth.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import env from "dotenv";
env.config();
const { PORT, DB_PASS } = process.env;
mongoose
  .connect(
    `mongodb+srv://dreamth:${DB_PASS}@testclaster.jnzonwj.mongodb.net/?retryWrites=true&w=majority&appName=testClaster`,
  )
  .then(() => console.log(`${new Date()} Connected to the database...`))
  .catch((err) => console.error(`${new Date()} ${err}`));
const app = express();
app.use(express.json());
app.get("/", async (req, res) => {
  res.status(200).send("meme2");
});
app.post("/auth/reg", async (req, res) => {
  res.status(200).send("meme3");
});
app.listen(PORT || 1337, (err) => {
  if (err) {
    return console.error(err);
  }
  console.log("Server is OK!");
});
