import { Button, CircularProgress, Grid, LinearProgress, Paper, Typography } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import Leaderboard from './Leaderboard';
import useStyles from './Styles/QuizAreaStyles';


const Home = () => {
  const classes = useStyles();
  const { quizid } = useParams();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [index, setIndex] = useState(-1);
  const [time, setTime] = useState(0);
  const [timeGivenforQ, setTimeGivenforQ] = useState(0);
  const [quizData, setQuizData] = useState([]);
  const [selectedButton, setSelectedButton] = useState('');
  const [correctOption, setCorrectOption] = useState('');

  const timeRef = useRef(-1);



  // This function is used to color the option button when it is selected
  function colorButton(optionID , bgcolor , color)
  {
      if(optionID === '') // if option id is empty string then selected option would be undefined
      return; // So, we are exiting from function before any error


      const slctdOption = document.getElementById(optionID);
      slctdOption.style.backgroundColor = bgcolor;
      slctdOption.style.color = color;
  }




  // This function is used to color the button based on circumstances
  function changeButton(optionID)
  {

    // If the selected button is selected again
      if(selectedButton === optionID)
      {
        colorButton(selectedButton , 'white' , 'black'); // uncolor the button
        setSelectedButton(''); // and set selected button to null
    }
    // If any other button is selected again
    else
    {
        colorButton(optionID , '#2196f3' , 'white');
        colorButton(selectedButton , 'white' , 'black'); // uncolor the button
        setSelectedButton(optionID);
      }
  }

  function checkAnswer()
  {
      if(selectedButton === correctOption)
      console.log('correct');
      else
      console.log('incorrect');
  }

  
  useEffect(() => {
        axios.get(`http://localhost:5000/quiz/${quizid}`)
        .then(data => {
            setQuizData(data.data);
        //   setTime(data.data.questions[index].time_given);
            setIsLoading(false);
            setIndex(0);
        })
        .catch( err => alert(`The following error occured : ${err.message}`));

        // runTimer();

        // return () => {
        //     clearInterval(interval);
        // }
  }, []);

  useEffect(() => {

    setCorrectOption('');
    setSelectedButton('');

    if(isLoading)
    {
        timeRef.current = 0;
        setTimeGivenforQ(1);
    }
    else
    {
        timeRef.current = quizData.questions[index].time_given;
        setTime(timeRef.current);
        setTimeGivenforQ(timeRef.current);
    }
      
    const interval = setInterval(() => {
        
        if(timeRef.current <= 0)
        {
            clearInterval(interval);
            checkAnswer();
        }

        timeRef.current -= 1;
        setTime(timeRef.current);
        // console.log(time , timeGivenforQ);
    }, 1000);

    if(index >= 0)
    {
        colorButton('option_1' , 'white' , 'black');
        colorButton('option_2' , 'white' , 'black');
        colorButton('option_3' , 'white' , 'black');
        colorButton('option_4' , 'white' , 'black');
    }


    if(!isLoading)
    for(let i = 0; i < 4 ; i +=1 )
    {
        if(quizData.questions[index].correct_answer === quizData.questions[index].options[i])
        {
            // console.log('correct ans : ' , quizData);
            setCorrectOption(`option_${i+1}`);
            break;
        }
    }
    // console.log('correct ans : ' , quizData);


      return () => {
          clearInterval(interval);
      }
  }, [index]);
  
  function incrementIndex()
  {
    checkAnswer();

    if(index + 1 < quizData.questions.length)
    setIndex( ind => ind + 1);

    else
    setIndex(0);


  }

  

  



  if(isLoading)
  return (
      <div className={classes.loadingArea}>
          <CircularProgress />
      </div>
  )

  return (
      <div className={classes.backgroundArea}>
        {/* { runTimer() } */}
        {/* {console.log(time , timeGivenforQ)} */}
        {/* { console.log(correctOption) } */}
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
                {/* { startTimer(10) } */}
                {/* {timeRef.current} */}
                {/* {time} */}
                {/* Title */}
            </Typography>
        </Paper>

        {/* --------------------------------------------------Timer--------------------------------------------- */}
        <LinearProgress 
            variant="determinate" 
            value={ Math.ceil(time / timeGivenforQ * 100)}
            // value={100}
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
                    <Paper elevation={3} className={classes.optionArea} id="option_1" onClick={() => changeButton('option_1')} >
                        <Typography variant="h5" align="center">
                            {quizData?.questions[index]?.options[0]}
                            {/* Option 1 */}
                        </Typography>
                    </Paper>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <Paper elevation={3} className={classes.optionArea} id="option_2" onClick={() => changeButton('option_2')}>
                        <Typography variant="h5" align="center">
                            {quizData?.questions[index]?.options[1]}
                            {/* Option 1 */}
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>

            <Grid container>
                <Grid item xs={12} sm={6}>
                    <Paper elevation={3} className={classes.optionArea} id="option_3" onClick={() => changeButton('option_3')}>
                        <Typography variant="h5" align="center"> 
                            {quizData?.questions[index]?.options[2]}
                            {/* Option 1 */}
                        </Typography>
                    </Paper>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <Paper elevation={3} className={classes.optionArea} id="option_4" onClick={() => changeButton('option_4')}>
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
