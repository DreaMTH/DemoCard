import express from "express";
import mongoose from "mongoose";
import env from "dotenv";
import chalk from "chalk";
import authRouter from "./routes/auth.js";
import cors from "cors";
env.config();
const { PORT, DB_PASS, DB_NAME } = process.env;
mongoose
  .connect(
    `mongodb+srv://dreamth:${DB_PASS}@testclaster.jnzonwj.mongodb.net/${DB_NAME}?retryWrites=true&w=majority&appName=testClaster`,
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
app.use(cors());
app.use("/auth", authRouter);
app.get("/", async (req, res) => {
  console.log(req.body);
  res.status(200).send("meme2");
});

app.listen(PORT || 1337, (err) => {
  if (err) {
    return console.error(chalk.black.bgRed(new Date()), err);
  }
  console.log(chalk.green.bold("Server is OK!"));
});
