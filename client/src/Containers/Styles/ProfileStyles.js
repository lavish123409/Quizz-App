import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
  profileDetails: {
    margin: '3.5% 0',
    padding: '3% 0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black'
  },
  avatarStyles: {
    fontSize: '3.5em',
    width: '130px',
    height: '130px',
    cursor: 'pointer',
    margin: '1% 0',
    backgroundColor: 'blue'
  },
  nameStyles: {
    margin: '0.2% 0',
    fontWeight: 'bold',
    fontSize: '1.9em',
    color: 'white'
  },
  logOutButtonStyles: {
    margin: '0.2% 0'
  },
  madeQuizzesDetails: {
    width: '90%',
    margin: '1% auto',
    padding: '1.5% 0',
    borderRadius: '5px',
    boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'
  }
});
