const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const Quiz = require('./models/quizSchema');
dotenv.config();


const app = express();

app.use(cors());
app.use(express.json());

// To check if the server is working or not
app.get('/' , (req,res) => res.send('hello world!!!'));

const port = process.env.PORT || 8000;
    
mongoose.connect(
    process.env.DB_CONNECTION,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
).catch( err => {
    // console.error('error : ' , err);
    process.exit(1);
}).then( async conn => {
    // console.log(conn);
    console.log('connected');
    
    app.listen(port , () => console.log(`app listening  on ${port}`));
});



app.get('/allquizzes' , (req,res) => {
    Quiz.find()
    .then( (data) => res.send(data));
});

// For getting a particular quiz with quiz id
app.get('/quiz/:quizid' , (req,res) => {
    const quizID = req.params.quizid;
    Quiz.findById(quizID)
    .then( data => res.send(data))
    .catch( err => console.log(err));
});

// For adding a quiz and then sending back the id
app.post('/addquiz' , (req,res) => {

    const quiz = new Quiz( req.body );

    quiz.save()
    .then( data => res.send(data._id.toString()))
    .catch( err => console.log(err));

});




