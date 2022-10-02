import {
  Button,
  CircularProgress,
  Grid,
  LinearProgress,
  Paper,
  Typography
} from '@material-ui/core';

import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

import axios from 'axios';

import Leaderboard from './Leaderboard';

import useStyles from './Styles/QuizAreaStyles';
import ErrorAlert from './ErrorAlert';

const Home = () => {
  const classes = useStyles();
  const { quizid } = useParams();

  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [index, setIndex] = useState(-1);
  const [time, setTime] = useState(0);
  const [timeGivenforQ, setTimeGivenforQ] = useState(0);
  const [quizData, setQuizData] = useState([]);
  const [selectedButton, setSelectedButton] = useState('');
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [errors, setErrors] = useState([]);

  const serverURL = process.env.REACT_APP_SERVER_URL;

  const timeRef = useRef(-1);
  const selectdButtonRef = useRef(null);
  const correctOptionRef = useRef(null);
  const showAnswerRef = useRef(false);

  let interval;

  // This function is used to color the option button when it is selected
  const colorButton = (optionID, bgcolor, color) => {
    if (optionID === '') {
      // if option id is empty string then selected option would be undefined
      return; // So, we are exiting from function before any error
    }

    const slctdOption = document.getElementById(optionID); // Get the button with given option id
    slctdOption.style.backgroundColor = bgcolor; // change the background color
    slctdOption.style.color = color; // change the font color
  };

  // This function is used to color the button based on circumstances
  const changeButton = (optionID) => {
    if (showAnswer) return; // If Quiz Area is in show answer state then any button color should not change on clicking

    // If the selected button is selected again
    if (selectedButton === optionID) {
      colorButton(selectedButton, 'white', 'black'); // uncolor the button
      setSelectedButton(''); // and set selected button to null
      selectdButtonRef.current = '';
    }
    // If any other button is selected again
    else {
      colorButton(optionID, '#2196f3', 'white'); // color the currently selected button
      colorButton(selectedButton, 'white', 'black'); // uncolor the previously selected button
      setSelectedButton(optionID); // set the currently selected button
      selectdButtonRef.current = optionID;
    }
  };

  // This function is used to check the answer and change the styling accordingly
  const checkAnswer = () => {
    clearInterval(interval); // [ NOT WORKING ] stop the timer

    showAnswerRef.current = true;
    setShowAnswer(showAnswerRef.current); // set the state of page to show the answer

    if (selectdButtonRef.current === correctOptionRef.current) {
      // if the option selected by user is correct option
      colorButton(correctOptionRef.current, '#00e676', 'white'); // show the correct option in green
      setScore((prevscore) => {
        let newscore = Math.round((timeRef.current / timeGivenforQ) * 1000);
        newscore += prevscore;
        return newscore;
      }); // update the score

      // If the answer is correct and user is present, then update the score to Database
      if (user) {
        const scoreData = {
          userid: user.userid,
          score
        };

        /**
         * Axios request to update the score of current user in current quiz to Database
         * This PUT request sends the score data which holds the user id of user and his/her score to server,
         * and receives a response or error from server
         */
        axios
          .put(`${serverURL}updatescore/${quizid}`, scoreData)
          // .then( () => console.log('updated successfully'))
          .catch((err) => setErrors([{ id: 0, msg: err.message }]));
      }
    } // if the option selected by user is incorrect
    else {
      colorButton(correctOptionRef.current, '#00e676', 'white'); // show the correct option in green
      colorButton(selectdButtonRef.current, '#f50057', 'white'); // show the selected incorrect option in red
    }
  };

  /**
   * this use effect would run whenever this page loads
   * it fetches the quiz data from DB and displays it to user
   * */

  useEffect(() => {
    /** setting the user data to state of this component from localstorage */
    setUser(JSON.parse(localStorage.getItem('userData')));

    /**
     * This axios GET request is calling the server to give
     * the details of the specific quiz with the given id
     * and then setting the quiz data with it
     */
    axios
      .get(`${serverURL}quiz/${quizid}`, {
        headers: {
          'auth-token': localStorage.getItem('userToken')
        }
      })
      .then((data) => {
        setQuizData(data.data);
        setIsLoading(false);
        setIndex(0);
      })
      .catch((err) => setErrors([{ id: 0, msg: err.message }]));

    // return () => {
    //     clearInterval(interval);
    // }
  }, []);

  /**
   * This use effect would run whenever the index value of question changes
   * It would change the question, its corresponding options on quiz interface
   * and would also reset the timer
   */

  useEffect(() => {
    correctOptionRef.current = '';
    selectdButtonRef.current = '';
    setSelectedButton(selectdButtonRef.current);

    if (isLoading) {
      // if the quiz data is not fetched yet
      timeRef.current = 0;
      setTimeGivenforQ(1);
    } // when the quiz data has been fetched
    else {
      timeRef.current = quizData.questions[index].time_given; // reset the timer value to the time allotted for the question
      setTime(timeRef.current); // set the time value
      setTimeGivenforQ(timeRef.current); // set the original time allotted for the given question
    }

    if (interval) {
      // [ NOT WORKING ] if timer is running then stop it
      clearInterval(interval);
    }

    /**  -------------------------------Timer------------------------------------------------  */
    interval = setInterval(() => {
      timeRef.current -= 1; // decrease the value by 1 every second
      setTime(timeRef.current);

      if (timeRef.current <= 0) {
        // if timer has expired
        clearInterval(interval); // stop the timer
        if (!showAnswerRef.current) {
          // if show answer state is not activated
          checkAnswer(); // then check the answer and activate the show answer state
        }
      }

      if (showAnswerRef.current) {
        // if show answer state has been activated
        clearInterval(interval); // stop the timer
      }
    }, 1000);

    if (index >= 0) {
      // whenever the index changes or new appears
      colorButton('option_1', 'white', 'black'); // uncolor
      colorButton('option_2', 'white', 'black'); // all
      colorButton('option_3', 'white', 'black'); // the
      colorButton('option_4', 'white', 'black'); // buttons
    }

    // loop to get the correct answer
    if (!isLoading) {
      for (let i = 0; i < quizData.questions[index].options.length; i += 1) {
        if (quizData.questions[index].correct_answer === quizData.questions[index].options[i]) {
          correctOptionRef.current = `option_${i + 1}`;
          break;
        }
      }
    }

    return () => {
      clearInterval(interval); // whenever this use effect unmounts, stop the timer
    };
  }, [index]);

  function incrementIndex() {
    showAnswerRef.current = false; // whenever next question appears, turn off the show answer state
    setShowAnswer(showAnswerRef.current);

    if (index + 1 < quizData.questions.length) {
      // If the index of the next question is available or is less than the length of questions array
      setIndex((ind) => ind + 1); // then set the index to next index
    } // otherwise
    else {
      window.location.replace(`\\quizfinal\\${quizid}`); // take the user to the Quiz Final page
    }
  }

  if (isLoading)
    return (
      <div className={classes.loadingArea}>
        <CircularProgress />
      </div>
    );

  return (
    <div className={classes.backgroundArea}>
      {errors.length === 0 ? '' : <ErrorAlert errors={errors} setErrors={setErrors} />}

      {/* --------------------------------------------------Name of the Quiz--------------------------------------------- */}
      <Paper elevation={3} className={classes.heading}>
        <Typography
          variant="h3"
          style={{
            textTransform: 'none'
          }}
          align="center">
          {quizData?.title}
        </Typography>
      </Paper>

      {/* --------------------------------------------------Timer--------------------------------------------- */}
      <LinearProgress
        variant="determinate"
        value={Math.ceil((time / timeGivenforQ) * 100)}
        style={{
          width: '90%',
          margin: '15px auto',
          height: '7px',
          borderRadius: '4px'
        }}
      />

      {/* --------------------------------------------------Question Area--------------------------------------------- */}
      <Paper elevation={3} className={classes.questionArea}>
        <Typography variant="h5" style={{ fontWeight: 'bold' }}>
          Q. {quizData?.questions[index]?.question}
        </Typography>
      </Paper>

      {/* --------------------------------------------------Options Area--------------------------------------------- */}
      <Grid
        container
        style={{
          width: '90%',
          margin: '15px auto'
        }}>
        <Grid container>
          <Grid item xs={12} sm={6}>
            <Paper
              elevation={3}
              className={classes.optionArea}
              id="option_1"
              onClick={() => changeButton('option_1')}>
              <Typography variant="h5" align="center">
                {quizData?.questions[index]?.options[0]}
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Paper
              elevation={3}
              className={classes.optionArea}
              id="option_2"
              onClick={() => changeButton('option_2')}>
              <Typography variant="h5" align="center">
                {quizData?.questions[index]?.options[1]}
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        <Grid container>
          <Grid item xs={12} sm={6}>
            <Paper
              elevation={3}
              className={classes.optionArea}
              id="option_3"
              onClick={() => changeButton('option_3')}>
              <Typography variant="h5" align="center">
                {quizData?.questions[index]?.options[2]}
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Paper
              elevation={3}
              className={classes.optionArea}
              id="option_4"
              onClick={() => changeButton('option_4')}>
              <Typography variant="h5" align="center">
                {quizData?.questions[index]?.options[3]}
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        {/* --------------------------------------------------Submit Buttton--------------------------------------------- */}
        <Grid container>
          <Button
            variant="contained"
            style={{
              padding: '10px',
              margin: '20px auto',
              textTransform: 'none'
            }}
            onClick={() => (showAnswer ? incrementIndex() : checkAnswer())}>
            {showAnswer ? 'Next' : 'Submit'}
          </Button>
        </Grid>
      </Grid>

      {/* --------------------------------------------------Leaderboard Buttton--------------------------------------------- */}
      <Button variant="contained" className={classes.leaderboard} onClick={() => setOpen(true)}>
        Open Leaderboard
      </Button>

      {open && <Leaderboard open={open} setOpen={setOpen} quizid={quizid} />}
    </div>
  );
};

export default Home;
