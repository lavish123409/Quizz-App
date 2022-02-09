const { body } = require("express-validator");

module.exports = [
  body("email").isEmail().withMessage("Given Email is invalid"),

  // body("email")
  //   .isLength({ max: 256 })
  //   .withMessage("Email should contain maximum 256 characters"),

  // body("email")
  //   .isLength({ min: 5 })
  //   .withMessage("Email should contain minimum 5 characters"),

  body("password").notEmpty().withMessage("Password is mandatory"),
];
