const Validator = require('validator');
const isEmpty = require('./is-empty');
module.exports = validateAttendanceInput = (data) => {
    let errors = {};
    data.lecture_id = !isEmpty(data.lecture_id) ? data.lecture_id : '';

    if(Validator.isEmpty(data.lecture_id)){
        errors.lecture_id = 'Lecture_id field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}