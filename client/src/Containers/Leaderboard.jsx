import React, { useEffect, useState } from 'react';
import { AppBar, CircularProgress, Dialog, IconButton, Paper, styled, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Toolbar, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import tableCellClasses from '@material-ui/core/TableCell';
import PropTypes from 'prop-types';
import axios from 'axios';
import ErrorAlert from './ErrorAlert';

// const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

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

  // False data
  // const leaaderboard = [
  //     {name : 'Parth' , score : 200},
  //     {name : 'Harsh' , score : 300},
  //     {name : 'Ayush' , score : 400},
  //     {name : 'Siddartha' , score : 150},
  //     {name : 'Lavish' , score : 0},
  // ]
  

const Leaderboard = ({open , setOpen , quizid}) => {

      const [leaderboard, setLeaderboard] = useState([]);
      const [isLoading, setIsLoading] = useState(true);
      const [errors, setErrors] = useState([]);

      useEffect( () => {

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
          .then(res => {
            setLeaderboard(res.data.leaderboard);
            setLeaderboard( prevleaderboard => {
              prevleaderboard.sort( (a,b) => b.score - a.score);
              return prevleaderboard;
            });
            setIsLoading(false);
          })
          .catch( err => {
            setErrors([ { id : 0 , msg : err.message} ]);
          });


        // return () => {
        //   ;
        // }
      }, []);

     return (
      
      <Dialog
          fullScreen
          open={open}
          onClose={() => setOpen(false)}
          // TransitionComponent={Transition}
      >

      { errors.length === 0 ? '' : (<ErrorAlert errors={errors} setErrors={setErrors}/>) }

        {/* { console.log(leaderboard)} */}
        {/* -----------------------------Nav Bar---------------------------------------------------- */}
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>

            <IconButton
              edge="start"
              color="inherit"
              onClick={() => setOpen(false)}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>

            <Typography 
                sx={{ ml: 2, flex: 1 }} 
                variant="h6" 
                component="div"
                style={{
                    margin : '10px auto'
                }}
            >
              Leaderboard
            </Typography>
            
          </Toolbar>
        </AppBar>

        {isLoading ? (

            <CircularProgress
              style={{
                margin : '10% auto'
              }}
            />

        ) : (

          <>
          
          {/* ---------------------------------------Leaderboard Table------------------------------------------------ */}
          <TableContainer
              component={Paper}
              style={{
                  margin : '100px auto',
                  width : '80%'
              }}
          >
  
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
      
                <TableHead>
        
                    <TableRow>
                    {/* <StyledTableCell align="center">Name</StyledTableCell>
                    <StyledTableCell align="center">Score</StyledTableCell> */}
        
                    <TableCell align="center" style={{ backgroundColor : 'black' , color : 'white'}}>Name</TableCell>
                    <TableCell align="center" style={{ backgroundColor : 'black' , color : 'white'}}>Score</TableCell>
        
                    </TableRow>
        
                </TableHead>
      
      
                <TableBody>
                    {/* { console.log(leaderboard[0]) } */}
                    {leaderboard.map((row) => (
                    /* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
                    <StyledTableRow 
                      key={row._id}
                    >
                        
                        <StyledTableCell component="th" scope="row" align="center">
                        {row.name}
                        </StyledTableCell>
                        <StyledTableCell align="center">{row.score}</StyledTableCell>
                        
                    </StyledTableRow>
                    ))}
                    
                </TableBody>
      
              </Table>
  
          </TableContainer>
          
          </>
        )}

      </Dialog>

     )

};

// Props validation
Leaderboard.propTypes = {
    open : PropTypes.bool.isRequired,
    setOpen : PropTypes.func.isRequired,
    quizid : PropTypes.string.isRequired
}

export default Leaderboard;