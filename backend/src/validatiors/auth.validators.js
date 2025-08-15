import { body } from "express-validator";

const userRegistrationValidator = () => {
  return [
    body("fullname").isEmpty().withMessage("Fullname is required"),

    body("emaill")
      .isEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Email is invalid"),

    body("username")
      .isEmpty()
      .withMessage("Username is required")
      .isLength({ min: 4 })
      .withMessage("Atleast 4 charactors are required")
      .isLength({ max: 8 })
      .withMessage("Atmost 8 charactors are allowed"),

    body("password")
      .isEmpty()
      .withMessage("Password is required")
      .isLength({ min: 3 })
      .withMessage("atleast 3 charactor is required"),
  ];
};

export { userRegistrationValidator };
