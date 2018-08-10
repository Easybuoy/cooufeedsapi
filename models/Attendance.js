const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//Create Schema
const AttendanceSchema = new Schema({
    lecture_id: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    },
    user_name: {
        type: String,
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


module.exports = User = mongoose.model('attendance', AttendanceSchema);