import { Button, Grid, TextField, Typography } from '@material-ui/core';
import React from 'react';
import useStyles from './styles';

function Home() {

    const classes = useStyles();

    return (
        <Grid container direction='column' alignItems='center'>
            <Grid item className={classes.section}>
                <Button variant='contained' color='primary' className={classes.makequizbutton} >
                    
                        Make a Quiz
                    
                </Button>
            </Grid>

            <Grid item className={`${classes.section} ${classes.quizcodesection}`} alignItems='center'>
                <TextField
                    required
                    id="outlined-required"
                    label="Enter the quiz code"
                    variant='outlined'
                />
                <Button className={classes.quizcodesectionbutton} variant='contained' color='success'>Enter</Button>
            </Grid>

            <Grid item className={classes.section}>
                <Typography variant='h4'>
                    Past Quizzes
                </Typography>
            </Grid>
        </Grid>
        // <div className={classes.make_quiz_section}>
        //     <h1>We are at home.</h1>
        // </div>
    )
}

export default Home
