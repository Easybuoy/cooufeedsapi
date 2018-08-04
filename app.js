const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// const autoIncrement = require('mongoose-auto-increment');
const app = express();


//Body Parser Middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json()); 

//DB config
const db = require('./config/keys').mongoURI;

//connecting to mongodb
 mongoose.connect(db, {useNewUrlParser: true})
.then(() => {
console.log('mongodb connected');
})
.catch((err) => {
    console.log('unable to connect to mongdb', err)
});


// autoIncrement.initialize(connection);

const port = process.env.PORT || 3000;

const profile = require('./routes/api/profile');
const lecture = require('./routes/api/lecture.js');

//using routes
app.use('/api/profile',profile);
app.use('/api/lecture', lecture);

app.get('/', (req, res) => {
    res.json('Welcome to Cooufeeds API');
});

app.listen(port, () => {
    console.log(`app listening on port ${port}`);
});