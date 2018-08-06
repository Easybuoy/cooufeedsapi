const mongoose = require('mongoose');


const Schema = mongoose.Schema;

//Create Schema
const UserSchema = new Schema({
    matric_no: {
        type: Number,
        sequence_value: 0,  
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
    email:{
        type: String,
        required: true,
        unique: true
    },
    phone:{
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    status: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
});


module.exports = User = mongoose.model('users', UserSchema);