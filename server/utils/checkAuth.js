import chalk from "chalk";
import jwt from "jsonwebtoken";

export default (req, res, next) => {
  const token = (req.headers.authorization || "").replace(/Bearer\s?/, "");
  if (token) {
    try {
      const decoded = jwt.verify(token, "token");
      req.userId = decoded.id;
      next();
    } catch (err) {
      console.error(chalk.black.bgRed("ERROR" + new Date()), err);
      return res.status(403).json({
        message: "bad auth.",
      });
    }
  } else {
    return res.status(400).json({
      message: "Cannot read token.",
    });
  }
};
