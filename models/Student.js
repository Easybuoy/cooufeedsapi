const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//Create Schema
const StudentSchema = new Schema({
    reg_no: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    firstname: {
        type: String,
        required: true
    },
    middlename: {
        type: String,
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    },
});


module.exports = User = mongoose.model('student', StudentSchema);