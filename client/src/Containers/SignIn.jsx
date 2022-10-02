import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  Link,
  Paper,
  TextField,
  Typography
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import axios from 'axios';

import React, { useState } from 'react';
import ErrorAlert from './ErrorAlert';

const SignIn = () => {
  const [errors, setErrors] = useState([]);

  function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    const loginData = {
      email: data.get('email'),
      password: data.get('password')
    };

    const serverURL = `${process.env.REACT_APP_SERVER_URL}login`;

    axios
      .post(serverURL, loginData)
      .then((res) => {
        localStorage.setItem('userToken', res.data.token);
        localStorage.setItem('userData', JSON.stringify(res.data.userData));

        window.location.replace('/');
      })
      .catch((err) => {
        setErrors(
          err.response.data.errors.map((msg, ind) => {
            const errorObject = {
              id: ind,
              msg
            };
            return errorObject;
          })
        );
      });
  }

  return (
    <div>
      {errors.length === 0 ? '' : <ErrorAlert errors={errors} setErrors={setErrors} />}

      <Container component="main" maxWidth="sm">
        <Paper
          elevation={3}
          style={{
            marginTop: '15%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
          <Avatar style={{ margin: '5%', backgroundColor: 'purple' }}>
            <LockOutlinedIcon />
          </Avatar>

          <Typography component="h1" variant="h4">
            Login
          </Typography>

          <Box
            component="form"
            onSubmit={(e) => handleSubmit(e)}
            noValidate
            style={{ padding: '10%' }}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />

            <Button
              color="primary"
              type="submit"
              fullWidth
              variant="contained"
              style={{ marginTop: '7%', marginBottom: '5%' }}>
              Sign In
            </Button>

            <Grid container>
              <Grid item>
                <Link href="/signup" variant="body2">
                  Do not have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>
    </div>
  );
};

export default SignIn;
