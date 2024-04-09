import { body } from "express-validator";

export const userValidator = [
  body("email").isEmail(),
  body("name").isLength({ min: 6 }),
  body("password").isLength({ min: 8 }),
];
