import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField
} from '@material-ui/core';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import ErrorAlert from './ErrorAlert';

const Addtitle = ({ open, setOpen, data, setData }) => {
  const [quizLink, setQuizLink] = useState('');
  const [openQuizLink, setOpenQuizLink] = useState(false);
  const [errors, setErrors] = useState([]);
  const serverURL = process.env.REACT_APP_SERVER_URL;

  /** function to run when the user has entered the Title of the quiz and wants the link of the quiz */
  const sendToDB = () => {
    const title = document.getElementById('title-input').value; // Get the title

    /** If title field is empty, display the error alert and prompt user to enter the title */
    if (title === '') {
      setErrors([{ id: 0, msg: 'Title should not be empty.' }]);
      return;
    }

    /** If user has not entered the details of the questions(question,options,correct answer and time allotted)
     *  or user might not have entered any question, then display the error alert and prompt the user to enter the question details
     */
    if (data.questions.length === 0) {
      setErrors([
        {
          id: 0,
          msg: 'Seems like you have not added the questions. Kindly add them and then add the quiz'
        }
      ]);
      return;
    }

    setData((previousQuestionData) => {
      const currentQuestionData = previousQuestionData;
      currentQuestionData.title = title;

      return currentQuestionData;
    }); // Adding the title to the object to be sent

    setData((previousQuestionData) => {
      const currentQuestionData = previousQuestionData;
      currentQuestionData.userid = JSON.parse(localStorage.getItem('userData')).userid;

      return currentQuestionData;
    }); // Adding the title to the object to be sent

    /** this axios post request is sending the quiz data
     * that is, its title, the data of questions (question , options , correct_answer , time_allotted)
     * and the empty leaderboard to the DB
     * */
    axios
      .post(`${serverURL}addquiz`, data)
      .then((res) => {
        setQuizLink(res.data);
        setOpenQuizLink(true);
        setOpen(false);
      })
      .catch((err) => {
        setErrors([{ id: 0, msg: err.message }]);
      });
  };

  const closeAddQuestion = () => {
    navigator.clipboard.writeText(quizLink);
    window.location.replace(`\\quizfinal\\${quizLink}`);
  };

  return (
    <div>
      {errors.length === 0 ? '' : <ErrorAlert errors={errors} setErrors={setErrors} />}

      {/* -------------------------------Dialog for Title Input---------------------------------------------------------- */}
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md">
        <DialogTitle style={{ marginLeft: '10px', fontSize: '1.2em' }}> Add the Title</DialogTitle>

        {/* -------------------------------Title input text field---------------------------------------------------------- */}

        <TextField
          required
          id="title-input"
          fullWidth
          label="Type the title of Quiz here"
          variant="outlined"
          style={{
            width: '900px',
            margin: '10px 30px'
          }}
        />

        {/* -------------------------------Quiz Link Button---------------------------------------------------------- */}

        <DialogActions>
          <Button
            variant="contained"
            style={{
              padding: '12px',
              margin: '20px auto'
            }}
            onClick={() => sendToDB()}>
            Get Quiz Link
          </Button>
        </DialogActions>
      </Dialog>

      {/* -------------------------------Dialog for Quiz Code---------------------------------------------------------- */}
      <Dialog open={openQuizLink} onClose={() => setOpenQuizLink(false)}>
        <DialogTitle> Here is your Quiz Link</DialogTitle>

        <DialogContent>
          <TextField
            disabled
            value={quizLink}
            style={{
              width: '300px',
              margin: '10px auto'
            }}
          />
        </DialogContent>

        <DialogActions>
          <Button variant="contained" onClick={() => closeAddQuestion(quizLink)}>
            Copy to Clipboard
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

Addtitle.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  data: PropTypes.shape.isRequired,
  setData: PropTypes.func.isRequired
};

export default Addtitle;
