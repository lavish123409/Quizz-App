const { body } = require("express-validator");

module.exports = [
  body("name").exists().withMessage("Name is mandatory"),

  body("name")
    .isLength({ max: 256 })
    .withMessage("Name should contain maximum 256 characters"),

  body("email").isEmail().withMessage("Given Email is invalid"),

  body("email")
    .isLength({ max: 256 })
    .withMessage("Email should contain maximum 256 characters"),

  body("email")
    .isLength({ min: 5 })
    .withMessage("Email should contain minimum 5 characters"),

  body("password")
    .isLength({ min: 8 })
    .withMessage("Password should contain minimum 8 characters"),

  body("password")
    .isLength({ max: 1024 })
    .withMessage("Password should contain maximum 1024 characters"),

  body("password").notEmpty().withMessage("Password is mandatory"),
];
