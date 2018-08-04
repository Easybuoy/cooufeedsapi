const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//Create Schema
const LectureSchema = new Schema({
    course_title: {
        type: String,
        required: true
    },
    course_code: {
        type: String,
        required: true
    },
    level: {
        type: Number,
        required: true
    },
    status: {
        type: Number,
        default: 0,
    },
    date_time: {
        type: Date,
        default: Date.now
    },
});


module.exports = User = mongoose.model('lecture', LectureSchema);