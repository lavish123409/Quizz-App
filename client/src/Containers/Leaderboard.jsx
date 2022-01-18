import React, { useEffect } from 'react';
import { AppBar, Dialog, IconButton, Paper, styled, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Toolbar, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import tableCellClasses from '@material-ui/core/TableCell';
import PropTypes from 'prop-types';

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
  const rows = [
      {name : 'Parth' , score : 200},
      {name : 'Harsh' , score : 300},
      {name : 'Ayush' , score : 400},
      {name : 'Siddartha' , score : 150},
      {name : 'Lavish' , score : 0},
  ]
  

const Leaderboard = ({open , setOpen}) => {

      useEffect(() => {
        console.log('running');
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
            {rows.map((row) => (
            <StyledTableRow key={row.name}>
                <StyledTableCell component="th" scope="row" align="center">
                {row.name}
                </StyledTableCell>
                <StyledTableCell align="center">{row.score}</StyledTableCell>
            </StyledTableRow>
            ))}
        </TableBody>
        </Table>
        </TableContainer>

        </Dialog>

     )

};

// Props validation
Leaderboard.propTypes = {
    open : PropTypes.bool.isRequired,
    setOpen : PropTypes.func.isRequired
}

export default Leaderboard;