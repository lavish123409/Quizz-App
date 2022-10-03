import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  questioninput: {
    width: '100%',
    margin: '25px'
    // height : '150px'
  },
  optioninput: {
    width: '90%',
    margin: '25px'
  },
  timeinput: {
    width: '50%',
    margin: '25px',
    [theme.breakpoints.down('md')]: {
      width: '100%'
    }
  }
}));
