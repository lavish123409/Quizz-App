import {
  Avatar,
  Button,
  CircularProgress,
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import axios from 'axios';

import useStyles from './Styles/ProfileStyles';

import ErrorAlert from './ErrorAlert';

/** These functions are styling the rows of React table
 *  [MAYBE NOT WORKING]
 */
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.blue,
    color: theme.palette.common.white
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14
  }
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0
  }
}));

// This function is used to Log Out the user by clearing the local storage and sending to home page
const logoutUser = () => {
  localStorage.clear();
  window.location.replace('/');
};

const Profile = () => {
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long'
  };

  const [errors, setErrors] = useState([]);
  const [userData, setUserData] = useState({});
  const [curruser, setCurruser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { userid } = useParams();

  const serverURL = process.env.REACT_APP_SERVER_URL;

  const classes = useStyles();

  /**
   * this use effect would run whenever user would load the profile page
   * and set the current user state and
   * also get the profile user data from DB
   */
  useEffect(() => {
    /** setting the current user data from localstorage */
    setCurruser(JSON.parse(localStorage.getItem('userData')));

    /**
     * Axios GET request to get the user data of the profile user
     * and then store it in userData state
     * we are also stopping loading state
     */
    axios
      .get(`${serverURL}user/${userid}`)
      .then((response) => {
        setUserData(response.data);
        setIsLoading(false);
      })
      .catch((err) => setErrors([{ id: 0, msg: err.message }]));

    return () => {
      setErrors([]);
      setUserData({});
      setCurruser(null);
      setIsLoading(true);
    };
  }, []);

  if (isLoading)
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '10% auto'
        }}>
        <CircularProgress />
      </div>
    );

  return (
    <div>
      {errors.length === 0 ? '' : <ErrorAlert errors={errors} setErrors={setErrors} />}

      <div className={classes.profileDetails}>
        <Avatar
          className={classes.avatarStyles}
          sx={{
            fontSize: '3em',
            width: '130px',
            height: '130px',
            backgroundColor: `rgb(\
                        ${Math.random() * 255}\
                        ${Math.random() * 255}\
                        ${Math.random() * 255}\
                        )`
          }}>
          {userData.name[0].toUpperCase()}
        </Avatar>

        <Typography
          variant="h5"
          className={classes.nameStyles}
          sx={{
            margin: '0.4% 0',
            fontWeight: 'bold',
            fontSize: '1.9em'
          }}>
          {userData.name}
        </Typography>

        {
          /** If user in the profile is the current logged in user
           * then show the Log Out button
           */
          userData._id === curruser.userid && (
            <Button
              variant="contained"
              color="secondary"
              sx={{
                margin: '0.5% 0'
              }}
              endIcon={<ExitToAppIcon />}
              onClick={logoutUser}>
              Log Out
            </Button>
          )
        }
      </div>

      <div className={classes.madeQuizzesDetails}>
        <Typography variant="h4" align="center">
          My Quizzes
        </Typography>

        <TableContainer
          component={Paper}
          style={{
            margin: '3% auto',
            width: '90%'
          }}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <TableCell align="center" style={{ backgroundColor: '#f03861', color: 'white' }}>
                  Title
                </TableCell>
                <TableCell align="center" style={{ backgroundColor: '#f03861', color: 'white' }}>
                  Made At
                </TableCell>
                <TableCell align="center" style={{ backgroundColor: '#f03861', color: 'white' }}>
                  {' '}
                  Go To{' '}
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {userData.quiz_made.map((row) => (
                /* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
                <StyledTableRow key={row._id}>
                  <StyledTableCell component="th" scope="row" align="center">
                    {row.title}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {new Date(row.madeAt).toLocaleDateString('hi', options)}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Button
                      variant="contained"
                      color="success"
                      sx={{
                        textTransform: 'none'
                      }}
                      href={`\\quizfinal\\${row._id}`}>
                      See Details
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default Profile;
