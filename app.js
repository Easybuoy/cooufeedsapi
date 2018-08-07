const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
// const autoIncrement = require('mongoose-auto-increment');
const app = express();


//Body Parser Middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    // res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Requested-With, Accept, Authorization');
    res.header('Access-Control-Allow-Headers', '*');

    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, PUT');
        return res.status(200).json({});
    }

    next();
});


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
const lecture = require('./routes/api/lecture');
const users = require('./routes/api/users');

app.get('/', (req, res) => {
    res.json('Welcome to Cooufeeds API');
});


//using routes
app.use('/api/profile',profile);
app.use('/api/lecture', lecture);
app.use('/api/users', users);


app.listen(port, () => {
    console.log(`app listening on port ${port}`);
});


app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        message: error.message
    });
});


module.exports = app;