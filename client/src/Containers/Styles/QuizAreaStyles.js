import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
  heading : {
      padding : '3px',
      width : '90%',
      margin : '10px auto'
  },
  backgroundArea : {
      backgroundColor : 'purple',
      height : '100vh',
    //   width : '100%',
      margin : '0px',
      padding : '0px'
  },
  questionArea : {
    padding : '23px',
    width : 'calc(90% - 30px)',
    margin : '10px auto',
    height : '250px'
  },
  optionArea : {
      padding : '7px',
      margin : '5px',
      cursor : 'pointer'
  },
  leaderboard : {
      position : 'absolute',
      top : 'calc(90% + 10px)',
      left : '30px',
      textTransform : 'none'
  }
});
