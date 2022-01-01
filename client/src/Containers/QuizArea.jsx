import { Button, CircularProgress, Grid, LinearProgress, Paper, Typography } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Leaderboard from './Leaderboard';
import useStyles from './Styles/QuizAreaStyles';


const Home = () => {
  const classes = useStyles();
  const { quizid } = useParams();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [index, setIndex] = useState(0);
//   const [time, setTime] = useState(0);
  const [quizData, setQuizData] = useState([]);
  
  useEffect(() => {
      axios.get(`http://localhost:5000/quiz/${quizid}`)
      .then(data => {
          setQuizData(data.data);
        //   setTime(data.data.questions[index].time_given);
          setIsLoading(false);
      })
      .catch( err => alert(`The following error occured : ${err.message}`));
    //   return () => {
    //       cleanup
    //   }
  }, []);
  
  function incrementIndex()
  {

    if(index + 1 < quizData.questions.length)
    setIndex( ind => ind + 1);

    else
    setIndex(0);


  }
  
//   function getProgress(timeValue)
//   {
//     if(!isLoading)
//         return Math.round( timeValue / quizData.questions[index].time_given  * 100);

//     return 0;
//   }

//   const timer = setInterval(() => {
//       setTime( tme => tme - 1);

//       if(time < 0)
//         clearInterval(timer);

//       console.log('Time : ' , time , '\nProgress : ', getProgress(time));
//   }, 1000);

//   setTimeout(() => {
//       clearInterval(timer);
//   }, quizData.questions[index].time_given * 1000);

//   const timer = setInterval(() => {
//     //   console.log(time);
//       setTime(time + 1);

//       if(time > 30)
//       clearInterval(timer.current);
//   }, 1000);

  



  if(isLoading)
  return (
      <div className={classes.loadingArea}>
          <CircularProgress />
      </div>
  )

  return (
      <div className={classes.backgroundArea}>
        {/* {console.log(quizData)} */}
        {/* --------------------------------------------------Name of the Quiz--------------------------------------------- */}
        <Paper elevation={3} className={classes.heading}>
            <Typography 
                variant="h3"
                style={{
                    textTransform : 'none'
                }}
                align="center"
                >
                {quizData?.title}
                {/* {time} */}
                {/* Title */}
            </Typography>
        </Paper>

        {/* --------------------------------------------------Timer--------------------------------------------- */}
        <LinearProgress 
            variant="determinate" 
            value={60}
            style={{
                width : '90%',
                margin : '15px auto',
                height : '7px',
                borderRadius : '4px'
            }}
        />

        {/* --------------------------------------------------Question Area--------------------------------------------- */}
        <Paper elevation={3} className={classes.questionArea}>
            <Typography variant="h5" style={{fontWeight : 'bold'}}>
                Q. {quizData?.questions[index]?.question}
                {/* This is question */}
            </Typography>
        </Paper>


        {/* --------------------------------------------------Options Area--------------------------------------------- */}
        <Grid 
            container 
            style={{
                width : '90%',
                margin : '15px auto'
            }}
            >
            <Grid container>
                <Grid item xs={12} sm={6}>
                    <Paper elevation={3} className={classes.optionArea}>
                        <Typography variant="h5" align="center">
                            {quizData?.questions[index]?.options[0]}
                            {/* Option 1 */}
                        </Typography>
                    </Paper>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <Paper elevation={3} className={classes.optionArea}>
                        <Typography variant="h5" align="center">
                            {quizData?.questions[index]?.options[1]}
                            {/* Option 1 */}
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>

            <Grid container>
                <Grid item xs={12} sm={6}>
                    <Paper elevation={3} className={classes.optionArea}>
                        <Typography variant="h5" align="center"> 
                            {quizData?.questions[index]?.options[2]}
                            {/* Option 1 */}
                        </Typography>
                    </Paper>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <Paper elevation={3} className={classes.optionArea}>
                        <Typography variant="h5" align="center">
                            {quizData?.questions[index]?.options[3]}
                            {/* Option 1 */}
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>

            {/* --------------------------------------------------Submit Buttton--------------------------------------------- */}
            <Grid container>
                <Button 
                    variant="contained"
                    style={{
                        padding : '10px',
                        margin : '20px auto',
                        textTransform : 'none'
                    }}
                    onClick={() => incrementIndex()}
                    >
                    Submit
                </Button>
            </Grid>
        </Grid>

        {/* --------------------------------------------------Leaderboard Buttton--------------------------------------------- */}
        <Button 
            variant="contained"
            className={classes.leaderboard}
            onClick={() => setOpen(true)}
        >
            Open Leaderboard
        </Button>

        <Leaderboard open={open} setOpen={setOpen}/>
        
      </div>
  );
};

export default Home;
