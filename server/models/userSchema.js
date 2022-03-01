const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxLength: 256,
  },
  email: {
    type: String,
    required: true,
    maxLength: 256,
    minLength: 5,
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
    maxLength: 1024,
  },
  quiz_given: [
    {
      title: {
        type: String,
        required: true,
      },
      score: {
        type: Number,
        required: true,
      },
      givenAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  quiz_made: [
    {
      title: {
        type: String,
        required: true,
      },
      madeAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
