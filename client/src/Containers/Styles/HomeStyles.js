import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
  section: {
    marginTop: '7.5%'
  },
  makequizbutton: {
    padding: '10px 20px',
    fontSize: '30px',
    textTransform: 'none'
  },
  quizcodesection: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '40%'
  },
  quizcodesectionbutton: {
    padding: '15px',
    // marginLeft: '10px',
    backgroundColor: '#6643b5',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#8971d0'
    }
  },
  appbarButtons: {
    marginRight: '30px',
    backgroundColor: 'rgba(255 , 255 , 255 , 1)',
    padding: '9px',
    fontWeight: '600',
    textTransform: 'none',
    '&:hover': {
      color: '#fff'
    }
  }
});
