import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
  appbar: {
    backgroundColor: '#118a7e',
    zIndex: '2'
  },
  appbarTitle: {
    marginLeft: '5%',
    cursor: 'pointer',
    fontWeight: '700'
  },
  loggingBox: {
    marginLeft: 'auto',
    display: 'flex'
  },
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
  },
  pastquizsection: {
    width: '90%',
    textAlign: 'center',
    paddingTop: '2%',
    marginBottom: '2%',
    borderRadius: '5px',
    boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'
  },
  loginErrorText: {
    fontFamily: 'Times New Roman',
    margin: '10px',
    color: '#9ba6a5'
  }
});
