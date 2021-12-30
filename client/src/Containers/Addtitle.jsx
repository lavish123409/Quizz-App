import { Button, Grid, Paper, TextField, Typography } from '@material-ui/core';
import React from 'react';
import useStyles from './Styles/AddQuestionStyles';



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
          Add the Title
        </Typography>
      </Paper>

      
      {/* -------------------------------Title input text field---------------------------------------------------------- */}
      <Grid container alignItems="center">
          <TextField
            required
            id="title-input"
            className={classes.questioninput}
            label="Type the title of Quiz here"
            variant="outlined"
            />
      </Grid>

      {/* -------------------------------Quiz Link Button---------------------------------------------------------- */}
      <Grid container alignItems="center">
            <Button
              variant="contained"
              style={{
                padding: '12px',
                margin: '20px auto'
              }}
              >
              Get Quiz Link
            </Button>
      </Grid>
      
    </div>
  );
};

export default Addquestion;
