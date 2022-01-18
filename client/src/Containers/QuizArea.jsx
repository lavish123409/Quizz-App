import { Button, CircularProgress, Grid, LinearProgress, Paper, Typography } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import Leaderboard from './Leaderboard';
import useStyles from './Styles/QuizAreaStyles';


const Home = () => {
  const classes = useStyles();
  const { quizid } = useParams();

  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [index, setIndex] = useState(-1);
  const [time, setTime] = useState(0);
  const [timeGivenforQ, setTimeGivenforQ] = useState(0);
  const [quizData, setQuizData] = useState([]);
  const [selectedButton, setSelectedButton] = useState('');
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);

  const timeRef = useRef(-1);
  const selectdButtonRef = useRef(null);
  const correctOptionRef = useRef(null);
  const showAnswerRef = useRef(false);

  let interval;



  // This function is used to color the option button when it is selected
  const colorButton = (optionID , bgcolor , color) => {
      if(optionID === '') // if option id is empty string then selected option would be undefined
      return; // So, we are exiting from function before any error


      const slctdOption = document.getElementById(optionID); // Get the button with given option id
      slctdOption.style.backgroundColor = bgcolor; // change the background color
      slctdOption.style.color = color; // change the font color
  }




  // This function is used to color the button based on circumstances
  const changeButton = (optionID) =>{
      if( showAnswer )
      return;

    // If the selected button is selected again
      if(selectedButton === optionID)
      {
        colorButton(selectedButton , 'white' , 'black'); // uncolor the button
        setSelectedButton(''); // and set selected button to null
        selectdButtonRef.current = '';
    }
    // If any other button is selected again
    else
    {
        colorButton(optionID , '#2196f3' , 'white'); // color the currently selected button
        colorButton(selectedButton , 'white' , 'black'); // uncolor the previously selected button
        setSelectedButton(optionID); // set the currently selected button
        selectdButtonRef.current = optionID;
      }
  }

  const checkAnswer = () => {
    
    clearInterval(interval); // [ NOT WORKING ] stop the timer

    showAnswerRef.current = true;
    setShowAnswer(showAnswerRef.current); // set the state of page to show the answer

    if(selectdButtonRef.current === correctOptionRef.current) // if the option selected by user is correct option
    {
        colorButton(correctOptionRef.current , '#00e676' , 'white'); // show the correct option in green
        setScore( prevscore => {
            let newscore = Math.round(timeRef.current / timeGivenforQ * 1000);
            newscore += prevscore;
            return newscore;
        }); // update the score

        if(user)
        {
            const scoreData = {
                userid: user.userid,
                score
              };

            axios.put(`http://localhost:5000/updatescore/${quizid}` , scoreData)
              .then( () => console.log('updated successfully'))
              .catch( (err) => console.log(err));

        }
    }
    else // if the option selected by user is incorrect
    {
        colorButton(correctOptionRef.current , '#00e676' , 'white'); // show the correct option in green
        colorButton(selectdButtonRef.current , '#f50057' , 'white'); // show the selected incorrect option in red
    }
  }


  /**
   * this use effect would run whenever this page loads
   * it fetches the quiz data from DB and displays it to user
   * */ 

  useEffect(() => {

        setUser(JSON.parse(localStorage.getItem('userData')));

        /**
         * This axios get request is calling the server to give
         * the details of the specific quiz with the given id
         * and then setting the quiz data with it
         */
        axios.get(`http://localhost:5000/quiz/${quizid}` , {
            headers : {
                'auth-token' : localStorage.getItem('userToken')
            }
        })
        .then(data => {
            setQuizData(data.data);
            setIsLoading(false);
            setIndex(0);
        })
        .catch( err => alert(`The following error occured : ${err.message}`));


        // return () => {
        //     clearInterval(interval);
        // }
  }, []);


  /**
     * This use effect would run whenever the index value of question changes
     * It would change the question, its corresponding options on quiz interface
     * and would also reset the timer
     */

  useEffect(() => {

    correctOptionRef.current = '';
    selectdButtonRef.current = '';
    setSelectedButton(selectdButtonRef.current);

    

    if(isLoading) // if the quiz data is not fetched yet
    {
        timeRef.current = 0;
        setTimeGivenforQ(1);
    }
    else // when the quiz data has been fetched
    {
        timeRef.current = quizData.questions[index].time_given; // reset the timer value to the time allotted for the question
        setTime(timeRef.current); // set the time value
        setTimeGivenforQ(timeRef.current); // set the original time allotted for the given question
    }

    if(interval) // [ NOT WORKING ] if timer is running then stop it
    clearInterval(interval);
      
    /**  -------------------------------Timer------------------------------------------------  */
    interval = setInterval(() => {

        timeRef.current -= 1; // decrease the value by 1 every second
        setTime(timeRef.current);
        
        if(timeRef.current <= 0) // if timer has expired
        {
            clearInterval(interval); // stop the timer
            if(!showAnswerRef.current) // if show answer state is not activated
            checkAnswer(); // then check the answer and activate the show answer state
        }

        if(showAnswerRef.current) // if show answer state has been activated
        clearInterval(interval); // stop the timer

    }, 1000);
    
    if(index >= 0) // whenever the index changes or new appears
    {
        colorButton('option_1' , 'white' , 'black'); // uncolor
        colorButton('option_2' , 'white' , 'black'); // all
        colorButton('option_3' , 'white' , 'black'); // the
        colorButton('option_4' , 'white' , 'black'); // buttons
    }
    
    // loop to get the correct answer
    if(!isLoading)
    for(let i = 0; i < quizData.questions[index].options.length ; i +=1 )
    {
        if(quizData.questions[index].correct_answer === quizData.questions[index].options[i])
        {
            correctOptionRef.current = `option_${i+1}`;
            break;
        }
    }


      return () => {
          clearInterval(interval); // whenever this use effect unmounts, stop the timer
      }
  }, [index]);
  
  function incrementIndex()
  {
    showAnswerRef.current = false; // whenever next question appears, turn off the show answer state
    setShowAnswer(showAnswerRef.current);

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
        
        {/* { console.log(score) } */}
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
            </Typography>
        </Paper>

        {/* --------------------------------------------------Timer--------------------------------------------- */}
        <LinearProgress 
            variant="determinate" 
            value={ Math.ceil(time / timeGivenforQ * 100)}
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
                        </Typography>
                    </Paper>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <Paper elevation={3} className={classes.optionArea} id="option_2" onClick={() => changeButton('option_2')}>
                        <Typography variant="h5" align="center">
                            {quizData?.questions[index]?.options[1]}
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>

            <Grid container>
                <Grid item xs={12} sm={6}>
                    <Paper elevation={3} className={classes.optionArea} id="option_3" onClick={() => changeButton('option_3')}>
                        <Typography variant="h5" align="center"> 
                            {quizData?.questions[index]?.options[2]}
                        </Typography>
                    </Paper>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <Paper elevation={3} className={classes.optionArea} id="option_4" onClick={() => changeButton('option_4')}>
                        <Typography variant="h5" align="center">
                            {quizData?.questions[index]?.options[3]}
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
                    onClick={() => showAnswer ? incrementIndex() : checkAnswer() }
                    >
                    { showAnswer ? 'Next' : 'Submit' }
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

        { open && (
            <Leaderboard open={open} setOpen={setOpen}/>
        )}
        
      </div>
  );
};

export default Home;
