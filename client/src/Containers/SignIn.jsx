import { Avatar, Box, Button, Container, Grid, Link, Paper, TextField, Typography } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import axios from 'axios';
import React from 'react';

function handleSubmit(event)
{
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    const loginData = {
      email: data.get('email'),
      password: data.get('password'),
    };

    axios.post('http://localhost:5000/login' , loginData)
        .then( res => {
            localStorage.setItem('userToken' , res.data.token);
            localStorage.setItem('userData' , JSON.stringify(res.data.userData));
        })
        .catch( err => console.log(err.response.data));
}

const SignIn = () => (
        <div>
            <Container component="main" maxWidth="sm">
                <Paper
                    elevation={3}
                    style={{
                        marginTop : '15%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar style={{ margin: '5%', backgroundColor: 'purple' }}>
                        <LockOutlinedIcon />
                    </Avatar>

                    <Typography component="h1" variant="h4" >
                        Login
                    </Typography>

                    <Box component="form" onSubmit={handleSubmit} noValidate style={{ padding: '10%' }}>
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
                        {/* <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                        /> */}
                        <Button
                            color="primary"
                            type="submit"
                            fullWidth
                            variant="contained"
                            style={{ marginTop: '7%', marginBottom: '5%' }}
                        >
                        Sign In
                        </Button>
                        <Grid container>
                        {/* <Grid item xs>
                            <Link href="#" variant="body2">
                            Forgot password?
                            </Link>
                        </Grid> */}
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
    )

export default SignIn
