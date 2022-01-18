import { AppBar, Avatar, Box, Button, Grid, TextField, Toolbar, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

import useStyles from './Styles/HomeStyles';

const goToQuiz = async (user) => {
  const quizCode = document.getElementById('quiz-code').value; // This value can be used to go to the quiz page

  const scoreData = {
    userid : user.userid,
    name : user.name,
    score : 0
  };
  try{
    const response = await axios.post( `http://localhost:5000/updatescore/${quizCode}` , scoreData );
    console.log(response.data);
  }
  catch(err){
    alert('this ran ' , err.message);
  }

  window.location.assign(`/quiz/${quizCode}`);
};


const getRandomColor = () => {
  const red = Math.random() * 255;
  const green = Math.random() * 100;
  const blue = Math.random() * 255;

  return `rgb(${red} , ${green} , ${blue})`;
}

const logoutUser = () => {
  localStorage.clear();
  window.location.reload();
};




const Home = () => {
  const classes = useStyles();
  const [user, setUser] = useState(null);


useEffect(() => {
  setUser(JSON.parse(localStorage.getItem('userData')));
  // return () => {
  //   cleanup
  // }
}, [])


  return (

    <>
      {console.log(user)}
      <AppBar
        style={{
          backgroundColor : '#118a7e'
        }}
      >
        <Toolbar>
          <Typography
            variant="h5"
            href="/"
            sx={{
              flexGrow : 1
            }}
            style={{
              marginLeft : '5%',
              cursor : 'pointer',
              fontWeight : '700'
            }}
          >
            Quizz App
          </Typography>

          {user ? (
            <Box
              style={{
                marginLeft : 'auto',
                display : 'flex'
              }}
            >
              <Avatar style={{
                marginRight : '35px',
                backgroundColor : getRandomColor()
              }}>
                {user.name.charAt(0).toUpperCase()}
              </Avatar>

              <Button className={classes.appbarButtons} onClick={() => logoutUser()}>
                Logout
              </Button>
            </Box>
          ) : (
              <Box
                style={{
                  marginLeft : 'auto'
                }}
              >
                <Button className={classes.appbarButtons} href="/signup">
                  Sign Up
                </Button>

                <Button className={classes.appbarButtons} href="/login">
                  Login
                </Button>
              </Box>
          )}

        </Toolbar>
      </AppBar>
    
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
          <Button className={classes.quizcodesectionbutton} variant="contained" onClick={() => goToQuiz(user)} >
            Enter
          </Button>
        </Grid>

        {/* ----------------Past quizzes section ----------------------------------------------------------------- */}
        <Grid item className={classes.section}>
          <Typography variant="h4">Past Quizzes</Typography>
        </Grid>
      </Grid>
    </>

  );
};

export default Home;
