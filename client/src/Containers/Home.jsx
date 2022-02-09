import { AppBar, Avatar, Box, Button, Grid, TextField, Toolbar, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

import useStyles from './Styles/HomeStyles';
import ErrorAlert from './ErrorAlert';
import MyTable from './MyTable';


// utility function to generate the random color
const getRandomColor = () => {
  const red = Math.random() * 255;
  const green = Math.random() * 100;
  const blue = Math.random() * 255;

  return `rgb(${red} , ${green} , ${blue})`;
}

// utility function to do the work regarding Logging Out the user
const logoutUser = () => {
  localStorage.clear();
  window.location.reload();
};




const Home = () => {
  const classes = useStyles();
  const [user, setUser] = useState(null);
  const [errors, setErrors] = useState([]);


  /** this use effect runs whenever Home page loads 
   *  and initializes the user state from  localstorage object
   * */
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('userData')));
    
    return () => {
      setErrors([]);
      setUser(null);
    }
  }, []);


  /** function to be run whenever user enters any quiz */
  const goToQuiz = async () => {
    const quizCode = document.getElementById('quiz-code').value; // This value can be used to go to the quiz page

    if(user === null)
    {
      setErrors([ { id : 0 , msg : 'You need to Login to give the quiz.'} ]);
      return;
    }

    let userhasgiven = {
      result : false
    };

    /**
     * Axios GET request to check whether the given user has already attempted the given quiz
     * and server returns an object holding the result of the condition 
     * If the user has given the quiz, then we would send him to QuizFinal page preventing him from giving the quiz again
     */
    try {
      userhasgiven = await axios.get( `http://localhost:5000/checkif/${user.userid}/hasgiven/${quizCode}` );
    }
    catch(err) {
      setErrors([ { id : 0 , msg : 'Enter the correct Quiz code.' } ]);
      return;
    }

    /** If user has already given the quiz, then take him to quizfinal page */
    if(userhasgiven.data.result)
    {
      window.location.assign(`/quizfinal/${quizCode}`);
      return;
    }

    /** If user has not given the quiz, update the score (or make a score object in leaderboard array of quiz) in Database */
    const scoreData = {
      userid : user.userid,
      name : user.name,
      score : 0
    };
    try{
      /** Axios POST request to post the score object to leaderboard array of the Quiz */
      await axios.post( `http://localhost:5000/updatescore/${quizCode}` , scoreData );
    }
    catch(err){
      setErrors([ { id : 0 , msg : 'Enter the correct Quiz code.'} ]);
      return;
    }

    window.location.assign(`/quiz/${quizCode}`);
  };


  /** function to run whenever user clicks the  'Make A Quiz' button */
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

      {/** ------------------------------------Error Alert Component-------------------------------------------------- */}
      { errors.length === 0 ? '' : (<ErrorAlert errors={errors} setErrors={setErrors}/>) }


      {/** ------------------------------------Navigation Bar-------------------------------------------------- */}
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
            /** If user is present, then show the Avatar and Log Out Button */
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
            /** Otherwise show the Sign Up and Sign In Buttons */
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
          <TextField required id="quiz-code" label="Enter the quiz code" variant="outlined" style={{ flex: '0.8'}}/>
          <Button className={classes.quizcodesectionbutton} variant="contained" onClick={() => goToQuiz()} style={{ flex: '0.1'}} >
            Enter
          </Button>
        </Grid>

        {/* ----------------Past quizzes section ----------------------------------------------------------------- */}
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
            user ?
            <MyTable/>
            :
            <Typography 
              variant="h6"
              style={{
                fontFamily: 'Times New Roman',
                margin: '10px',
                color: '#9ba6a5'
              }}
            >
              You need to login to see the past quizzes.
            </Typography>
          }
        </Grid>
      </Grid>
    </>

  );
};

export default Home;
