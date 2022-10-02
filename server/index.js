const express = require("express");
const cors = require("cors");

const dotenv = require("dotenv");

const mongoose = require("mongoose");
const Quiz = require("./models/quizSchema");
const User = require("./models/userSchema");

const { validationResult } = require("express-validator");
const registerRules = require("./validation/registerRules");
const loginRules = require("./validation/loginRules");

const bcryptjs = require("bcryptjs");

const jwt = require("jsonwebtoken");
const verify = require("./routes/verifyToken");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// To check if the server is working or not
app.get("/", (req, res) => res.send("hello world!!!"));

const port = process.env.PORT || 8000;

mongoose
  .connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((err) => {
    console.error("error : ", err);
    process.exit(1);
  })
  .then(async (conn) => {
    // console.log(conn);
    console.log("connected");

    app.listen(port, () => console.log(`app listening  on ${port}`));
  });

// For getting a particular quiz with quiz id
app.get("/quiz/:quizid", verify, (req, res) => {
  const quizID = req.params.quizid;
  Quiz.findById(quizID)
    .then((data) => res.send(data))
    .catch((err) => console.log(err));
});

// For adding a quiz and then sending back the id
app.post("/addquiz", async (req, res) => {
  /** First, we would add the quiz to our database */

  const quizData = {
    title: req.body.title,
    questions: req.body.questions,
    leaderboard: req.body.leaderboard,
  };

  const quiz = new Quiz(quizData);
  let quizid = "",
    response;

  try {
    response = await quiz.save();
  } catch (err) {
    return res.status(401).send({ errors: [err.message] });
  }

  quizid = response._id.toString();

  /**
   * Now, we have to put the entry of the quiz in the quiz_given field of user
   */

  const quizForUserData = {
    _id: mongoose.Types.ObjectId(quizid),
    title: quizData.title,
  };

  try {
    await User.findByIdAndUpdate(
      req.body.userid,
      {
        $push: { quiz_made: quizForUserData },
      },
      { safe: true, upsert: true }
    );
  } catch (err) {
    return res.status(401).send({ message: err.message });
  }

  /** Send the quiz id at the end */
  res.send(quizid);
});

app.post("/register", registerRules, async (req, res) => {
  /** First, get all the errors related to validation of parameters */

  let errors = validationResult(req).errors;
  errors = errors.map((error) => error.msg);

  /** If errors array of validation is not empty, then send those errors to client  */
  if (!(errors.length === 0)) return res.status(400).send({ errors });

  /** Check whether the Email from which the user wants to Sign In is already registered, then remind user to Login */
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist)
    return res
      .status(401)
      .send({ errors: ["Email already exists. You might need to login."] });

  /** Hash the password using a random salt before storing it in Database */
  const salt = await bcryptjs.genSalt(10);
  const hashedPassword = await bcryptjs.hash(req.body.password, salt);

  /** Now, Save the User details in Database */
  const userData = {
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
    quiz_given: [],
    quiz_made: [],
  };

  let user = new User(userData);

  user
    .save()
    .then((data) => {
      const token = jwt.sign({ _id: data._id }, process.env.TOKEN_SECRET);

      const responseData = {
        token,
        userData: {
          userid: data._id,
          name: data.name,
        },
      };
      res.send(responseData);
    })
    .catch((err) => res.status(400).send({ errors: [err.message] }));
});

app.post("/login", loginRules, async (req, res) => {
  /** First, get all the errors related to validation of parameters */

  let errors = validationResult(req).errors;
  errors = errors.map((error) => error.msg);

  /** If errors array of validation is not empty, then send those errors to client  */
  if (!(errors.length === 0)) return res.status(400).send({ errors });

  /** Checking if the user has already registered using his/her Email */
  const user = await User.findOne({ email: req.body.email });
  if (!user)
    return res.status(401).send({ errors: ["Email or password is invalid."] });

  /** Checking whether the password entered by user is correct or not */
  const isValidPassword = await bcryptjs.compare(
    req.body.password,
    user.password
  );

  /** If the entered password is not valid, send the error */
  if (!isValidPassword)
    return res.status(401).send({ errors: ["Email or password is invalid."] });

  /** Generating the JWT token to send back to user */
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);

  // res.set("auth-token", "token"); [NOT WORKING] Don't know why
  const responseData = {
    token,
    userData: {
      userid: user._id,
      name: user.name,
    },
  };

  res.send(responseData);
});

app.post("/updatescore/:quizid", async (req, res) => {
  /** Adding the name and score object to leaderboard array of Quiz */

  const quizid = req.params.quizid;
  const leaderboardData = {
    _id: mongoose.Types.ObjectId(req.body.userid),
    name: req.body.name,
    score: req.body.score,
  };

  const response = await Quiz.findByIdAndUpdate(
    quizid,
    {
      $push: { leaderboard: leaderboardData },
    },
    { safe: true, upsert: true }
  );

  /** Adding the title and score object to quiz_given array of User */

  const userQuizData = {
    _id: mongoose.Types.ObjectId(quizid),
    title: response.title,
    score: req.body.score,
  };

  await User.findByIdAndUpdate(req.body.userid, {
    $push: { quiz_given: userQuizData },
  });

  res.send(response);
});

app.put("/updatescore/:quizid", async (req, res) => {
  const quizid = req.params.quizid;

  /** Updating the score field in leaderboard array of the Quiz */
  await Quiz.updateOne(
    { _id: mongoose.Types.ObjectId(quizid) },
    {
      $set: {
        "leaderboard.$[userid].score": req.body.score,
      },
    },
    {
      arrayFilters: [
        { "userid._id": mongoose.Types.ObjectId(req.body.userid) },
      ],
    }
  );

  /** Updating the score field of quiz_given array of User  */
  await User.updateOne(
    { _id: mongoose.Types.ObjectId(req.body.userid) },
    {
      $set: {
        "quiz_given.$[quizid].score": req.body.score,
      },
    },
    {
      arrayFilters: [{ "quizid._id": mongoose.Types.ObjectId(quizid) }],
    }
  );
});

// Route to get the specific user from Database
app.get("/user/:userid", async (req, res) => {
  const userid = req.params.userid;
  let response;

  try {
    response = await User.findById(userid);
  } catch (err) {
    res.status(400).send({ errors: [err.message] });
  }

  res.send(response);
});

// Route to check whether the given user has attempted the given quiz already or not
app.get("/checkif/:userid/hasgiven/:quizid", async (req, res) => {
  const { userid, quizid } = req.params;

  let response;

  try {
    response = await User.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(userid),
        },
      },
      {
        $project: {
          matchedIndex: {
            $indexOfArray: ["$quiz_given._id", mongoose.Types.ObjectId(quizid)],
          },
        },
      },
    ]);
  } catch (err) {
    res.status(400).send({ errors: [err.message] });
  }

  /** The 'matchedIndex' would be -1 if the id of given quiz is not present in quiz_given array of user
   *  or, in other words we can say that, the user has not given that quiz
   */
  res.send({ result: response[0].matchedIndex !== -1 });
});
