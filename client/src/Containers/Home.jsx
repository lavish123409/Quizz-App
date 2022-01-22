import { AppBar, Avatar, Box, Button, Grid, TextField, Toolbar, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

import useStyles from './Styles/HomeStyles';
import ErrorAlert from './ErrorAlert';
import MyTable from './MyTable';


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
  const [errors, setErrors] = useState([]);


useEffect(() => {
  setUser(JSON.parse(localStorage.getItem('userData')));
  // return () => {
  //   cleanup
  // }
}, []);


const goToQuiz = async () => {
  const quizCode = document.getElementById('quiz-code').value; // This value can be used to go to the quiz page

  if(user === null)
  {
    setErrors([ { id : 0 , msg : 'You need to Login to give the quiz.'} ]);
    return;
  }

  const scoreData = {
    userid : user.userid,
    name : user.name,
    score : 0
  };
  try{
    // const response = await axios.post( `http://localhost:5000/updatescore/${quizCode}` , scoreData );
    await axios.post( `http://localhost:5000/updatescore/${quizCode}` , scoreData );
    // console.log(response.data);
  }
  catch(err){
    setErrors([ { id : 0 , msg : 'Enter the correct Quiz code.'} ]);
    return;
  }

  window.location.assign(`/quiz/${quizCode}`);
};


const makeaQuiz = () => {

  if(user === null)
  {
    setErrors([ { id : 0 , msg : 'You need to Login to make and save the quiz.'} ]);
    return;
  }

  window.location.assign('/adddetails');
};


  return (

    <>
      {console.log(user)}

      { errors.length === 0 ? '' : (<ErrorAlert errors={errors} setErrors={setErrors}/>) }

      <AppBar
        style={{
          backgroundColor : '#118a7e',
          zIndex : '2'
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
              <Avatar 
              style={{
                marginRight : '35px',
                backgroundColor : getRandomColor(),
                cursor: 'pointer'
              }}
              onClick={() => window.location.assign(`/profile/${user.userid}`)}
              >
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
            onClick={() => makeaQuiz()}
          >
            Make a Quiz
          </Button>
        </Grid>

        {/* ----------------Quiz code text field ----------------------------------------------------------------- */}
        <Grid item className={`${classes.section} ${classes.quizcodesection}`}>
          <TextField required id="quiz-code" label="Enter the quiz code" variant="outlined" />
          <Button className={classes.quizcodesectionbutton} variant="contained" onClick={() => goToQuiz()} >
            Enter
          </Button>
        </Grid>

        {/* ----------------Past quizzes section ----------------------------------------------------------------- */}
        {/* <Grid item className={classes.section}> */}
        <Grid 
          item
          className={classes.section}
          style={{
            width: '90%',
            textAlign: 'center',
            paddingTop: '2%',
            marginBottom: '2%',
            borderRadius: '5px',
            boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
          }}
        >
          <Typography variant="h4">Past Quizzes</Typography>
          {
            // user ?
            <MyTable/>
            // :
            // <Typography 
            //   variant="h6"
            //   style={{
            //     fontFamily: 'Times New Roman',
            //     margin: '10px',
            //     color: '#9ba6a5'
            //   }}
            // >
            //   You need to login to see the past quizzes.
            // </Typography>
          }
        </Grid>
        {/* </Grid> */}
      </Grid>
    </>

  );
};

export default Home;
