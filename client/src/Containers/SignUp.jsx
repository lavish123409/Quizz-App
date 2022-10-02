import React, { useState } from 'react';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import { makeStyles } from '@material-ui/core/styles';

import axios from 'axios';

import ErrorAlert from './ErrorAlert';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <strong>Quizz App</strong> {new Date().getFullYear()}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

export default function SignUp() {
  const [errors, setErrors] = useState([]);
  const [firstnameerror, setfirstnameerror] = useState(false);
  const [lastnameerror, setlastnameerror] = useState(false);

  const serverURL = process.env.REACT_APP_SERVER_URL;

  const classes = useStyles();

  /** function which would run pressing the Sign Up button */
  async function handleSignUp() {
    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const email = document.getElementById('email');
    const password = document.getElementById('password');

    const validName = /^[a-zA-Z]+$/;

    /** Checking whether First Name and Last Name are valid */
    if (!validName.test(firstName.value)) {
      setfirstnameerror(true);
      return;
    }

    if (!validName.test(lastName.value)) {
      setlastnameerror(true);
      return;
    }

    /** Data to send to server */
    const userData = {
      name: `${firstName.value} ${lastName.value}`,
      email: email.value,
      password: password.value
    };

    try {
      /**
       * Axios POST request to send the data of the current user to be stored in Database
       * the user object includes name, email and password fields
       * the server sends back the auth token to securely establish the connection on sensitive paths
       * and also the user data for personal reference
       */
      const response = await axios.post(`${serverURL}register`, userData);
      localStorage.setItem('userToken', response.data.token);
      localStorage.setItem('userData', JSON.stringify(response.data.userData));
    } catch (err) {
      /** Setting the errors sent by the server to the errors array to display in the Alert */
      setErrors(
        err.response.data.errors.map((msg, ind) => {
          const errorObject = {
            id: ind,
            msg
          };
          return errorObject;
        })
      );

      return;
    }

    firstName.value = '';
    lastName.value = '';
    email.value = '';
    password.value = '';
    /** Returning to the home page after Sign Up */
    window.location.replace('/');
  }

  return (
    <>
      {/** -------------------------------Alert Component--------------------------------------------------------------- */}
      {errors.length === 0 ? '' : <ErrorAlert errors={errors} setErrors={setErrors} />}

      <Container
        component="main"
        maxWidth="xs"
        p={20}
        style={{ backgroundColor: 'white', borderRadius: '5px' }}>
        <CssBaseline />

        <div className={classes.paper}>
          {/** -------------------------------Lock Icon--------------------------------------------------------------- */}
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>

          {/** -------------------------------Sign Up Heading--------------------------------------------------------------- */}
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>

          {/** -------------------------------Sign Up Form--------------------------------------------------------------- */}
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  error={firstnameerror}
                  helperText={firstnameerror ? 'First name should contain english alphabets.' : ''}
                  onClick={() => setfirstnameerror(false)}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  // required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="lname"
                  error={lastnameerror}
                  helperText={lastnameerror ? 'Last name should contain english alphabets.' : ''}
                  onClick={() => setlastnameerror(false)}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
              </Grid>
            </Grid>

            <Button
              // type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={() => handleSignUp()}>
              Sign Up
            </Button>

            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>

        {/** -------------------------------Copyright Section--------------------------------------------------------------- */}
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
    </>
  );
}
