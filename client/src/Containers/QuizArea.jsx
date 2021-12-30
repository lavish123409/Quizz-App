import { Button, Grid, LinearProgress, Paper, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import Leaderboard from './Leaderboard';
import useStyles from './Styles/QuizAreaStyles';


const Home = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);


  return (
      <div className={classes.backgroundArea}>

        {/* --------------------------------------------------Name of the Quiz--------------------------------------------- */}
        <Paper elevation={3} className={classes.heading}>
            <Typography 
                variant="h3"
                style={{
                    textTransform : 'none'
                }}
                align="center"
                >
                Good Quiz
            </Typography>
        </Paper>

        {/* --------------------------------------------------Timer--------------------------------------------- */}
        <LinearProgress 
            variant="determinate" 
            value={10}
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
                Q. This a Question?
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
                            Option 1
                        </Typography>
                    </Paper>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <Paper elevation={3} className={classes.optionArea}>
                        <Typography variant="h5" align="center">
                            Option 1
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>

            <Grid container>
                <Grid item xs={12} sm={6}>
                    <Paper elevation={3} className={classes.optionArea}>
                        <Typography variant="h5" align="center"> 
                            Option 1
                        </Typography>
                    </Paper>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <Paper elevation={3} className={classes.optionArea}>
                        <Typography variant="h5" align="center">
                            Option 1
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
                        margin : '30px auto',
                        textTransform : 'none'
                    }}
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
