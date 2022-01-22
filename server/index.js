const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const Quiz = require("./models/quizSchema");
const User = require("./models/userSchema");
const { body, validationResult } = require("express-validator");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const verify = require("./routes/verifyToken");
dotenv.config();

// const Joi = require("@hapi/joi");

// const userValidationSchema = {
//   name: Joi.string().max(256).required(),
//   email: Joi.string().min(5).max(256).email().required(),
//   password: Joi.string().min(8).required(),
// };

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
    // console.error('error : ' , err);
    process.exit(1);
  })
  .then(async (conn) => {
    // console.log(conn);
    console.log("connected");

    app.listen(port, () => console.log(`app listening  on ${port}`));
  });

app.get("/allquizzes", (req, res) => {
  Quiz.find().then((data) => res.send(data));
});

// For getting a particular quiz with quiz id
app.get("/quiz/:quizid", verify, (req, res) => {
  const quizID = req.params.quizid;
  Quiz.findById(quizID)
    .then((data) => res.send(data))
    .catch((err) => console.log(err));
});

// For adding a quiz and then sending back the id
app.post("/addquiz", (req, res) => {
  const quiz = new Quiz(req.body);

  quiz
    .save()
    .then((data) => res.send(data._id.toString()))
    .catch((err) => console.log(err));
});

app.post(
  "/register",
  [
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

    body("password").exists().withMessage("Password is mandatory"),
  ],
  async (req, res) => {
    // console.log(validationResult(req));

    // const validation = Joi.validate(req.body, userValidationSchema);
    // res.send(validation);
    //   console.log(req.body);

    let errors = validationResult(req).errors;
    errors = errors.map((error) => error.msg);
    // console.log(typeof errors);

    // if (!(errors === null)) return res.status(400).send({ errors });
    if (!(errors.length === 0)) return res.status(400).send({ errors });

    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist)
      return res
        .status(401)
        .send({ errors: ["Email already exists. You might need to login."] });

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(req.body.password, salt);

    const userData = {
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      quiz_given: [],
      quiz_made: [],
    };
    let user = new User(userData);
    // console.log(user);
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
  }
);

app.post(
  "/login",
  [
    body("email").isEmail().withMessage("Given Email is invalid"),

    // body("email")
    //   .isLength({ max: 256 })
    //   .withMessage("Email should contain maximum 256 characters"),

    // body("email")
    //   .isLength({ min: 5 })
    //   .withMessage("Email should contain minimum 5 characters"),

    body("password").notEmpty().withMessage("Password is mandatory"),
  ],
  async (req, res) => {
    // console.log(validationResult(req));

    // const validation = Joi.validate(req.body, userValidationSchema);
    // res.send(validation);
    //   console.log(req.body);

    let errors = validationResult(req).errors;
    errors = errors.map((error) => error.msg);
    // console.log(errors);

    if (!(errors.length === 0)) return res.status(400).send({ errors });

    const user = await User.findOne({ email: req.body.email });
    if (!user)
      return res
        .status(401)
        .send({ errors: ["Email or password is invalid."] });

    const isValidPassword = await bcryptjs.compare(
      req.body.password,
      user.password
    );
    if (!isValidPassword)
      return res
        .status(401)
        .send({ errors: ["Email or password is invalid."] });

    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);

    res.set("auth-token", "token");
    const responseData = {
      token,
      userData: {
        userid: user._id,
        name: user.name,
      },
    };
    res.send(responseData);
  }
);

app.put("/updatescore/:quizid", async (req, res) => {
  // console.log(req.params);
  // console.log(req.body);

  const quizid = req.params.quizid;
  // const leaderboardData = {
  //   _id: mongoose.Types.ObjectId(req.body.userid),
  //   name: req.body.name,
  //   score: req.body.score,
  // };

  const response = await Quiz.updateOne(
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

  // console.log(response);
  //   {},
  //   (err, model) => {
  //     // console.log("update ran");
  //     if (err) return console.log(err);
  //     console.log(model);
  //     res.send(err);
  //     // console.log("update ran");
  //     // return res.json(model);
  //   }
  // );
});

app.post("/updatescore/:quizid", async (req, res) => {
  // console.log("in post");
  // console.log(req.params);
  // console.log(req.body);

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
    // (err, model) => {
    //   if (err) return res.send(err);
    //   quizTitle = model.title;
    //   console.log(model);
    //   return res.json(model);
    // }
  );

  const userQuizData = {
    _id: mongoose.Types.ObjectId(quizid),
    title: response.title,
    score: req.body.score,
  };

  await User.findByIdAndUpdate(req.body.userid, {
    $push: { quiz_given: userQuizData },
  });

  // console.log("response : ", response);
  res.send(response);
});

app.get("/quizgivenby/:userid", async (req, res) => {
  const userid = req.params.userid;
  let response;

  try {
    response = await User.findById(userid);
    // console.log("userdata : ", response);
  } catch (err) {
    res.status(400).send(err.message);
  }

  res.send(response.quiz_given);
});
