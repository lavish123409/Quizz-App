import { Button, Grid, Paper, TextField, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import useStyles from './Styles/AddQuestionStyles';
import Addtitle from './Addtitle';



const Addquestion = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({
    title : '',
    questions : [],
    leaderboard : []
  });


  const sendData = () => {
    const question = document.getElementById('question-input').value;
    const option1 = document.getElementById('option1-input').value;
    const option2 = document.getElementById('option2-input').value;
    const option3 = document.getElementById('option3-input').value;
    const option4 = document.getElementById('option4-input').value;
    const correctAnswer = document.getElementById('correct-answer').value;
    const timeGiven = document.getElementById('time-given').value;
  
    const questionData = {
      question,
      options : [],
      correct_answer : correctAnswer,
      time_given : timeGiven
    };

    questionData.options.push(option1);
    questionData.options.push(option2);
    questionData.options.push(option3);
    questionData.options.push(option4);

    setData( previousQuestionData => {
      previousQuestionData.questions.push(questionData);
      return data;
    });
  
  
    document.getElementById('question-input').value = '';
    document.getElementById('option1-input').value = '';
    document.getElementById('option2-input').value = '';
    document.getElementById('option3-input').value = '';
    document.getElementById('option4-input').value = '';
    document.getElementById('correct-answer').value = '';
    document.getElementById('time-given').value = '';
  
  };

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
              />
          </Grid>

          {/* -------------------------------Time alloted for question Input---------------------------------------------------------- */}
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
              onClick={ () => setOpen(true)}
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

      <Addtitle open={open} setOpen={setOpen} data={data} setData={setData} />
    </div>
  );
};


export default Addquestion;
