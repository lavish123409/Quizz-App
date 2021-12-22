import { Button, Grid, TextField, Typography } from '@material-ui/core';
import React from 'react';
import useStyles from './Styles/HomeStyles';

const goToQuiz = () => {
  const quizCode = document.getElementById('quiz-code').value; // This value can be used to go to the quiz page
  console.log('Quiz code : ', quizCode);
};

const Home = () => {
  const classes = useStyles();

  return (
    <Grid container direction="column" alignItems="center">
      {/* ----------------Making Quiz button ----------------------------------------------------------------- */}
      <Grid item className={classes.section}>
        <Button
          variant="contained"
          color="primary"
          className={classes.makequizbutton}
          href="/adddetails">
          Make a Quiz
        </Button>
      </Grid>

      {/* ----------------Quiz code text field ----------------------------------------------------------------- */}
      <Grid item className={`${classes.section} ${classes.quizcodesection}`}>
        <TextField required id="quiz-code" label="Enter the quiz code" variant="outlined" />
        <Button className={classes.quizcodesectionbutton} variant="contained" onClick={goToQuiz}>
          Enter
        </Button>
      </Grid>

      {/* ----------------Past quizzes section ----------------------------------------------------------------- */}
      <Grid item className={classes.section}>
        <Typography variant="h4">Past Quizzes</Typography>
      </Grid>
    </Grid>
  );
};

export default Home;
