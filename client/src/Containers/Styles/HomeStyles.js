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
    alignItems: 'center'
  },
  quizcodesectionbutton: {
    padding: '15px',
    marginLeft: '10px'
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
