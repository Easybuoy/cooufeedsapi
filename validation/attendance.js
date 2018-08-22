const Validator = require('validator');
const isEmpty = require('./is-empty');
module.exports = validateAttendanceInput = (data) => {
    let errors = {};
    data.lecture_id = !isEmpty(data.lecture_id) ? data.lecture_id : '';
    data.device_id = !isEmpty(data.device_id) ? data.device_id : '';

    if(Validator.isEmpty(data.lecture_id)){
        errors.lecture_id = 'lecture_id field is required';
    }

    if(Validator.isEmpty(data.device_id)){
        errors.device_id = 'device_id field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}