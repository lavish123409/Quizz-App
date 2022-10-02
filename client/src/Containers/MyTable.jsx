import {
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';

import React, { useEffect, useState } from 'react';

import axios from 'axios';

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

const MyTable = () => {
  /** Options for Date object */
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long'
  };

  const [pastQuizData, setpastQuizData] = useState([]);
  const serverURL = process.env.REACT_APP_SERVER_URL;

  /** This use effect would run whenever MyTable component would load on Home page
   *  and it would fetch all the user data from Database
   *  and then set the pastQuizData state to the quiz_given array of user to display it to user
   */
  useEffect(async () => {
    const user = JSON.parse(localStorage.getItem('userData'));

    /** Axios GET request to get the user object from Database
     *  and then initialize the quiz_given by array to pastQuizData for displaying in the table
     */
    const response = await axios.get(`${serverURL}user/${user.userid}`);
    setpastQuizData(response.data.quiz_given);
    setpastQuizData((prevQuizData) => {
      prevQuizData.reverse();
      return prevQuizData;
    });

    return () => {
      /** when the component unmounts, set the pastQuizData state to null */
      setpastQuizData([]);
    };
  }, []);

  return (
    <div>
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
                Score
              </TableCell>
              <TableCell align="center" style={{ backgroundColor: '#f03861', color: 'white' }}>
                Given At
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {pastQuizData.map((row) => (
              /* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
              <StyledTableRow
                key={row._id}
                onClick={() => window.location.assign(`\\quizfinal\\${row._id}`)}
                sx={{
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.18)'
                  }
                }}>
                <StyledTableCell component="th" scope="row" align="center">
                  {row.title}
                </StyledTableCell>
                <StyledTableCell align="center">{row.score}</StyledTableCell>
                <StyledTableCell align="center">
                  {new Date(row.givenAt).toLocaleString('en-us', options)}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default MyTable;
