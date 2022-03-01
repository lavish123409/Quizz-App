const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  questions: [
    {
      question: {
        type: String,
        required: true,
      },
      options: [
        {
          type: String,
          required: true,
        },
      ],
      correct_answer: {
        type: String,
        required: true,
      },
      time_given: {
        type: Number,
        required: true,
      },
    },
  ],
  leaderboard: [
    {
      name: {
        type: String,
        required: true,
      },
      score: {
        type: Number,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model("quizze", quizSchema);
