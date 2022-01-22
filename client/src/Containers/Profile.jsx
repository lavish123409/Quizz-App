import { Avatar, Button, Paper, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
// import { ExitToAppIcon } from '@material-ui/icons';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import useStyles from './Styles/ProfileStyles';
import ErrorAlert from './ErrorAlert';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.blue,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));


  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));




const Profile = () => {
    // const [user, setUser] = useState({});
    const [errors, setErrors] = useState([]);
    const [tableData, setTableData] = useState([]);
    const {userid} = useParams();

    const classes = useStyles();

    useEffect(() => {
    //   console.log('rnng');
    //   setUser(JSON.parse(localStorage.getItem('userData')));

      axios.get(`http://localhost:5000/quizmadeby/${userid}`)
      .then( (response) => setTableData(response.data))
      .catch( (err) => setErrors([ { id : 0 , msg : err.message} ]));


    
      return () => {
        ;
      };
    }, []);


    // const pastQuizData = [
    //         {title : 'Parth' , score : 200},
    //         {title : 'Harsh' , score : 300},
    //         {title : 'Ayush' , score : 400},
    //         {title : 'Siddartha' , score : 150},
    //         {title : 'Lavish' , score : 0},
    // ]
    

  return <div>

      { errors.length === 0 ? '' : (<ErrorAlert errors={errors} setErrors={setErrors}/>) }
      {/* {console.log(tableData)} */}

      <div className={classes.profileDetails}>
            <Avatar 
                className={classes.avatarStyles}
                sx={{
                    fontSize: '3em',
                    width: '130px',
                    height: '130px'
                }}
            >
                L
            </Avatar>
            <Typography 
                variant="h5" 
                className={classes.nameStyles}
                sx={{
                    margin: '0.4% 0',
                    fontWeight: 'bold',
                    fontSize: '1.9em',
                }}
            >
                Lavish
            </Typography>
            <Button
                variant="contained"
                color="secondary"
                sx={{
                    margin: '0.5% 0'
                }}
                endIcon={<ExitToAppIcon/>}
            >
                Log Out
            </Button>
      </div>
      <div
        className={classes.madeQuizzesDetails}
      >
        <Typography 
            variant="h4"
            align="center"
        >
            My Quizzes
        </Typography>

        <TableContainer
                component={Paper}
                style={{
                    margin : '3% auto',
                    width : '90%'
                }}
            >

                <Table sx={{ minWidth: 700 }} aria-label="customized table">

                <TableHead>

                    <TableRow>
                    {/* <StyledTableCell align="center">Name</StyledTableCell>
                    <StyledTableCell align="center">Score</StyledTableCell> */}

                        <TableCell align="center" style={{ backgroundColor : '#f03861' , color : 'white'}}>Title</TableCell>
                        <TableCell align="center" style={{ backgroundColor : '#f03861' , color : 'white'}}>Made At</TableCell>
                        <TableCell align="center" style={{ backgroundColor : '#f03861' , color : 'white'}}> Go To </TableCell>

                    </TableRow>

                </TableHead>


                <TableBody>
                    {/* { console.log(leaderboard[0]) } */}
                    {tableData.map((row) => (
                    /* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
                    <StyledTableRow key={row._id}>
                        
                        <StyledTableCell component="th" scope="row" align="center">
                        {row.title}
                        </StyledTableCell>
                        <StyledTableCell align="center">{row.madeAt}</StyledTableCell>
                        <StyledTableCell align="center">
                            <Button
                                variant="contained"
                                color="success"
                                sx={{
                                    textTransform: 'none',
                                }}
                            >
                                See Details
                            </Button>    
                        </StyledTableCell>
                        
                    </StyledTableRow>
                    ))}
                    
                </TableBody>

                </Table>

            </TableContainer>
      </div>
  </div>;
};

export default Profile;
