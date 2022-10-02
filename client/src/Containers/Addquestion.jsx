import { Button, Grid, Paper, TextField, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import useStyles from './Styles/AddQuestionStyles';
import Addtitle from './Addtitle';
import ErrorAlert from './ErrorAlert';

const Addquestion = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({
    title: '',
    questions: [],
    leaderboard: []
  }); // question data to be sent to DB
  const [fieldErrors, setFieldErrors] = useState({
    question: false,
    option1: false,
    option2: false,
    option3: false,
    option4: false,
    correctanswer: false,
    timegiven: false
  }); // fieldErrors object to set the error on every text field
  const [questionData, setQuestionData] = useState({
    question: '',
    options: [],
    correct_answer: '',
    time_given: ''
  }); // questionData object to hold data related to every question
  const [option1, setOption1] = useState('');
  const [option2, setOption2] = useState('');
  const [option3, setOption3] = useState('');
  const [option4, setOption4] = useState('');
  const [errors, setErrors] = useState([]);

  const sendData = () => {
    /** If question field is empty, display the error on question text field */
    if (questionData.question === '') {
      setFieldErrors((prevValue) => ({ ...prevValue, question: true }));
      return;
    }

    /** If option 1 field is empty, display the error on option 1 text field */
    if (option1 === '') {
      setFieldErrors((prevValue) => ({ ...prevValue, option1: true }));
      return;
    }

    /** If option 2 field is empty, display the error on option 2 text field */
    if (option2 === '') {
      setFieldErrors((prevValue) => ({ ...prevValue, option2: true }));
      return;
    }

    /** If option 3 field is empty, display the error on option 3 text field */
    if (option3 === '') {
      setFieldErrors((prevValue) => ({ ...prevValue, option3: true }));
      return;
    }

    /** If option 4 field is empty, display the error on option 4 text field */
    if (option4 === '') {
      setFieldErrors((prevValue) => ({ ...prevValue, option4: true }));
      return;
    }

    /** If correct answer field is empty, display the error on correct answer text field */
    if (questionData.correct_answer === '') {
      setFieldErrors((prevValue) => ({ ...prevValue, correctanswer: true }));
      return;
    }

    /** If correct answer is not one of the given option, then show the error */
    if (
      !(
        questionData.correct_answer === option1 ||
        questionData.correct_answer === option2 ||
        questionData.correct_answer === option3 ||
        questionData.correct_answer === option4
      )
    ) {
      setErrors([{ id: 0, msg: 'Correct answer should be one of the options.' }]);
      return;
    }

    /** If time given field is empty, display the error on time given text field */
    if (questionData.time_given === '') {
      setFieldErrors((prevValue) => ({ ...prevValue, timegiven: true }));
      return;
    }

    questionData.options.push(option1);
    questionData.options.push(option2);
    questionData.options.push(option3);
    questionData.options.push(option4);

    setData((previousQuestionData) => {
      previousQuestionData.questions.push(questionData);
      return data;
    });

    // document.getElementById('question-input').value = '';
    setQuestionData((prevValue) => ({
      ...prevValue,
      question: '',
      options: [],
      correct_answer: '',
      time_given: ''
    }));
    setOption1('');
    setOption2('');
    setOption3('');
    setOption4('');
    // document.getElementById('option1-input').value = '';
    // document.getElementById('option2-input').value = '';
    // document.getElementById('option3-input').value = '';
    // document.getElementById('option4-input').value = '';
    // document.getElementById('correct-answer').value = '';
    // document.getElementById('time-given').value = '';
  };

  return (
    <div>
      {errors.length === 0 ? '' : <ErrorAlert errors={errors} setErrors={setErrors} />}

      {/* -------------------------------Header---------------------------------------------------------- */}
      <Paper
        elevation={3}
        style={{
          width: '90%',
          margin: '15px auto',
          padding: '5px'
        }}>
        <Typography
          variant="h3"
          align="center"
          style={{
            textTransform: 'none'
          }}>
          Add the Question
        </Typography>
      </Paper>

      <Grid container alignItems="center">
        {/* -------------------------------Question Input---------------------------------------------------------- */}
        <Grid container alignItems="center">
          <TextField
            required
            className={classes.questioninput}
            id="question-input"
            label="Type your question here"
            variant="outlined"
            multiline
            maxRows={5}
            value={questionData.question}
            onChange={(e) =>
              setQuestionData((prevValue) => ({ ...prevValue, question: e.target.value }))
            }
            error={fieldErrors.question}
            helperText={fieldErrors.question ? 'Question cannot be empty.' : ''}
            onClick={() => setFieldErrors((prevValue) => ({ ...prevValue, question: false }))}
          />
        </Grid>
        {/* -------------------------------Options Input---------------------------------------------------------- */}
        <Grid container>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              className={classes.optioninput}
              id="option1-input"
              label="Option 1"
              variant="outlined"
              value={option1}
              onChange={(e) => setOption1(e.target.value)}
              error={fieldErrors.option1}
              helperText={fieldErrors.option1 ? 'Option field cannot be empty.' : ''}
              onClick={() => setFieldErrors((prevValue) => ({ ...prevValue, option1: false }))}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              required
              className={classes.optioninput}
              id="option2-input"
              label="Option 2"
              variant="outlined"
              value={option2}
              onChange={(e) => setOption2(e.target.value)}
              error={fieldErrors.option2}
              helperText={fieldErrors.option2 ? 'Option field cannot be empty.' : ''}
              onClick={() => setFieldErrors((prevValue) => ({ ...prevValue, option2: false }))}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              required
              className={classes.optioninput}
              id="option3-input"
              label="Option 3"
              variant="outlined"
              value={option3}
              onChange={(e) => setOption3(e.target.value)}
              error={fieldErrors.option3}
              helperText={fieldErrors.option3 ? 'Option field cannot be empty.' : ''}
              onClick={() => setFieldErrors((prevValue) => ({ ...prevValue, option3: false }))}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              required
              className={classes.optioninput}
              id="option4-input"
              label="Option 4"
              variant="outlined"
              value={option4}
              onChange={(e) => setOption4(e.target.value)}
              error={fieldErrors.option4}
              helperText={fieldErrors.option4 ? 'Option field cannot be empty.' : ''}
              onClick={() => setFieldErrors((prevValue) => ({ ...prevValue, option4: false }))}
            />
          </Grid>

          {/* -------------------------------Correct answer Input---------------------------------------------------------- */}
          <Grid container alignItems="center">
            <TextField
              required
              id="correct-answer"
              label="Correct answer"
              variant="outlined"
              style={{
                width: '100%',
                margin: '25px'
              }}
              value={questionData.correct_answer}
              onChange={(e) =>
                setQuestionData((prevValue) => ({ ...prevValue, correct_answer: e.target.value }))
              }
              error={fieldErrors.correctanswer}
              helperText={fieldErrors.correctanswer ? 'Question cannot be empty.' : ''}
              onClick={() =>
                setFieldErrors((prevValue) => ({ ...prevValue, correctanswer: false }))
              }
            />
          </Grid>

          {/* -------------------------------Time alloted for question Input---------------------------------------------------------- */}
          <Grid container alignItems="center">
            <TextField
              type="number"
              required
              id="time-given"
              label="Time allotted for the question (in seconds)"
              variant="outlined"
              style={{
                width: '50%',
                margin: '25px'
              }}
              value={questionData.time_given}
              onChange={(e) =>
                setQuestionData((prevValue) => ({ ...prevValue, time_given: e.target.value }))
              }
              error={fieldErrors.timegiven}
              helperText={fieldErrors.timegiven ? 'Question cannot be empty.' : ''}
              onClick={() => setFieldErrors((prevValue) => ({ ...prevValue, timegiven: false }))}
            />
          </Grid>

          {/* -------------------------------Add Details Button---------------------------------------------------------- */}
          <Grid container alignItems="center">
            <Button
              variant="contained"
              style={{
                padding: '12px',
                margin: '20px'
              }}
              onClick={sendData}>
              Add Details
            </Button>

            <Button
              variant="contained"
              onClick={() => setOpen(true)}
              style={{
                padding: '12px',
                margin: '20px 20px 20px auto',
                textDecoration: 'none'
              }}>
              Add Title
            </Button>
          </Grid>
        </Grid>
      </Grid>

      <Addtitle open={open} setOpen={setOpen} data={data} setData={setData} />
    </div>
  );
};

export default Addquestion;
