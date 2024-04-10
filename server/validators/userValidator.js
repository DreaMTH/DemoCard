import { body } from "express-validator";

export const userValidator = [
  body("email").isEmail(),
  body("name").isLength({ min: 6 }),
  body("password").isStrongPassword({
    minLength: 8,
    minUppercase: 1,
    minLowercase: 1,
    minNumbers: 1,
  }),
];
