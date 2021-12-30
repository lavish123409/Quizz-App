import { Button, Grid, Paper, TextField, Typography } from '@material-ui/core';
import React from 'react';
import useStyles from './Styles/AddQuestionStyles';

const sendData = () => {
  const question = document.getElementById('question-input').value;
  const option1 = document.getElementById('option1-input').value;
  const option2 = document.getElementById('option2-input').value;
  const option3 = document.getElementById('option3-input').value;
  const option4 = document.getElementById('option4-input').value;
  const timeGiven = document.getElementById('time-given').value;

  const obj = {
    question,
    option1,
    option2,
    option3,
    option4,
    timeGiven
  };

  let questionData = localStorage.getItem('question-data');
  questionData = JSON.parse(questionData) || [];

  // console.log(questionData);

  if(questionData != null)
  questionData = [...questionData , JSON.stringify(obj)];
  // questionData.push(obj);
  else
  questionData = [ JSON.stringify(obj) ];

  localStorage.setItem('question-data' , questionData);

  document.getElementById('question-input').value = '';
  document.getElementById('option1-input').value = '';
  document.getElementById('option2-input').value = '';
  document.getElementById('option3-input').value = '';
  document.getElementById('option4-input').value = '';
  document.getElementById('time-given').value = '';

  // console.log(typeof questionData);
};

const Addquestion = () => {
  const classes = useStyles();

  return (
    <div>
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
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              required
              className={classes.optioninput}
              id="option2-input"
              label="Option 2"
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              required
              className={classes.optioninput}
              id="option3-input"
              label="Option 3"
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              required
              className={classes.optioninput}
              id="option4-input"
              label="Option 4"
              variant="outlined"
            />
          </Grid>

          <Grid container alignItems="center">
            <TextField
              type="number"
              required
              id="time-given"
              label="Time allotted for the question (in milliseconds)"
              variant="outlined"
              style={{
                width: '50%',
                margin: '25px'
              }}
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
              href="/addtitle"
              style={{
                padding: '12px',
                margin: '20px 20px 20px auto',
                textDecoration: 'none'
              }}
              >
              Add Title
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Addquestion;
