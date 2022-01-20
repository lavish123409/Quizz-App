import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';



const Addtitle = ({ open , setOpen , data , setData }) => {
  const [quizLink, setQuizLink] = useState('');
  const [openQuizLink, setOpenQuizLink] = useState(false);
  

  const sendToDB = () => {
    const title = document.getElementById('title-input').value; // Get the title
    setData( previousQuestionData => {
      const currentQuestionData = previousQuestionData;
      currentQuestionData.title = title;
      
      return currentQuestionData;
    }); // Adding the title to the object to be sent

    /** this axios post request is sending the quiz data 
     * that is, its title, the data of questions (question , options , correct_answer , time_allotted)
     * and the empty leaderboard to the DB 
     * */ 
    axios.post( 'http://localhost:5000/addquiz' , data)
    .then(res => {
      setQuizLink(res.data);
      setOpenQuizLink(true);
      setOpen(false);
    })
    .catch(err => alert(`The following error occured : ${err}`));

  }


  return (
    <div>
      {/* -------------------------------Dialog for Title Input---------------------------------------------------------- */}
      <Dialog 
        open={open} 
        onClose={ () => setOpen(false)}
        maxWidth="md"
        >


        <DialogTitle style={{ marginLeft : '10px' , fontSize : '1.2em'}}> Add the Title</DialogTitle>

        
        {/* -------------------------------Title input text field---------------------------------------------------------- */}
        
          <TextField
            required
            id="title-input"
            fullWidth
            label="Type the title of Quiz here"
            variant="outlined"
            style={{
              width : '900px',
              margin : '10px 30px'
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
                onClick={() => sendToDB()}
                >
                Get Quiz Link
              </Button>

            </DialogActions>
        
      </Dialog>

      {/* -------------------------------Dialog for Quiz Code---------------------------------------------------------- */}
      <Dialog
        open={openQuizLink}
        onClose={() => setOpenQuizLink(false)}
        >
        <DialogTitle> Here is your Quiz Link</DialogTitle>
        
        <DialogContent>
          <TextField
            disabled
            value={quizLink}
            style={{
              width : '300px',
              margin : '10px auto'
            }}
          />
        </DialogContent>

        <DialogActions>
          <Button
            variant="contained"
            onClick={() => navigator.clipboard.writeText(quizLink)}
          >
            Copy to Clipboard
          </Button>
        </DialogActions>
      </Dialog>
      
    </div>
  );
};

Addtitle.propTypes = {
  open : PropTypes.bool.isRequired,
  setOpen : PropTypes.func.isRequired,
  data : PropTypes.shape.isRequired,
  setData : PropTypes.func.isRequired
}

export default Addtitle;
