import { body } from "express-validator";

export const userValidator = [
  body("email", "Incorrect email adress!").isEmail(),
  body("name", "Incorrect name!").isLength({ min: 3 }),
  body(
    "password",
    "Incorrect password! Password must contains 8 digits, at least 1 number, at least 1 upper-case letter and 1 lower-case latter.",
  ).isStrongPassword({
    minLength: 8,
    minUppercase: 1,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 0,
  }),
  body("description", "Description field cannot be empty!")
    .optional()
    .isLength({ min: 1 }),
  body("interests", "Interests field cannot be empty")
    .optional()
    .isLength({ min: 1 }),
];

export const userLoginValidator = [
  body("email", "Incorrect email adress!").isEmail(),
  body("password", "Incorrect password").isLength({ min: 8 }),
];
