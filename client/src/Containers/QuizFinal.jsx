import {
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
  TextField,
  Typography
} from '@mui/material';

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import axios from 'axios';

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

const QuizFinal = () => {
  const { quizid } = useParams();

  const [leaderboard, setLeaderboard] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState([]);

  const serverURL = process.env.REACT_APP_SERVER_URL;

  /**
   * This axios get request is calling the server to give
   * the details of the specific quiz with the given id
   * and then setting the quiz data with it
   */
  useEffect(() => {
    axios
      .get(`${serverURL}quiz/${quizid}`, {
        headers: {
          'auth-token': localStorage.getItem('userToken')
        }
      })
      .then((res) => {
        setLeaderboard(res.data.leaderboard);
        setLeaderboard((prevleaderboard) => {
          prevleaderboard.sort((a, b) => b.score - a.score);
          return prevleaderboard;
        });
        setIsLoading(false);
      })
      .catch((err) => {
        setErrors([{ id: 0, msg: err.message }]);
      });

    /** when this component unmounts, initialize all states to default */
    return () => {
      setLeaderboard([]);
      setIsLoading(true);
      setErrors([]);
    };
  }, []);

  return (
    <div>
      {errors.length === 0 ? '' : <ErrorAlert errors={errors} setErrors={setErrors} />}

      <div
        style={{
          margin: '5% 0',
          padding: '3% 0',
          backgroundColor: 'black'
        }}>
        <Paper
          sx={{
            width: '85%',
            margin: '1% auto',
            padding: '1% 0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-evenly'
          }}>
          <TextField
            variant="outlined"
            margin="normal"
            id="quizid"
            name="quizid"
            autoFocus
            disabled
            value={quizid}
            sx={{
              flex: '0.8'
            }}
          />

          <Button
            variant="contained"
            color="primary"
            sx={{
              flex: '0.1',
              padding: '1.3% 0',
              fontSize: '1.1rem',
              fontWeight: 'bold'
            }}
            onClick={() => navigator.clipboard.writeText(quizid)}>
            Copy
          </Button>
        </Paper>
      </div>

      {isLoading ? (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
          <CircularProgress />
        </div>
      ) : (
        <div
          style={{
            width: '90%',
            margin: '1% auto',
            padding: '1.5% 0',
            borderRadius: '5px',
            boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'
          }}>
          <Typography variant="h4" align="center">
            Leaderboard
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
                    Name
                  </TableCell>
                  <TableCell align="center" style={{ backgroundColor: '#f03861', color: 'white' }}>
                    Score
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {leaderboard.map((row) => {
                  const currUserCellStyle = {
                    backgroundColor:
                      row._id === JSON.parse(localStorage.getItem('userData')).userid
                        ? '#42b883 !important'
                        : 'inherit',
                    color:
                      row._id === JSON.parse(localStorage.getItem('userData')).userid
                        ? 'white !important'
                        : 'inherit'
                  };

                  return (
                    /* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
                    <StyledTableRow
                      key={row._id}
                      onClick={() => window.location.assign(`\\profile\\${row._id}`)}
                      sx={{
                        cursor: 'pointer',
                        '&:hover': {
                          backgroundColor: 'rgba(0, 0, 0, 0.18)'
                        }
                      }}>
                      <StyledTableCell
                        component="th"
                        scope="row"
                        align="center"
                        sx={currUserCellStyle}>
                        {row.name}
                      </StyledTableCell>
                      <StyledTableCell align="center" sx={currUserCellStyle}>
                        {row.score}
                      </StyledTableCell>
                    </StyledTableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
    </div>
  );
};

export default QuizFinal;
