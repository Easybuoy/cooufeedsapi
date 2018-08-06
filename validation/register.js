const Validator = require('validator');
const isEmpty = require('./is-empty');
module.exports = validateRegisterInput = (data) => {
    let errors = {};
    data.matric_no = !isEmpty(data.matric_no) ? data.matric_no : '';
    data.surname = !isEmpty(data.surname) ? data.surname : '';
    data.firstname = !isEmpty(data.firstname) ? data.firstname : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.phone = !isEmpty(data.phone) ? data.phone : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.password2 = !isEmpty(data.password2) ? data.password2 : '';


    if(!Validator.isLength(data.surname, {min: 2, max: 30})){
        errors.surname = 'Surname must be between 2 and 30 characters';
    }

    if(!Validator.isLength(data.firstname, {min: 2, max: 30})){
        errors.firstname = 'Firstname must be between 2 and 30 characters';
    }

    if(Validator.isEmpty(data.matric_no)){
        errors.matric_no = 'Matric No field is required';
    }

    if(Validator.isEmpty(data.surname)){
        errors.surname = 'Surname field is required';
    }

    if(Validator.isEmpty(data.firstname)){
        errors.firstname = 'Firstname field is required';
    }

    if(!Validator.isEmail(data.email)){
        errors.email = `${data.email} is not a valid email`;
    }

    if(Validator.isEmpty(data.email)){
        errors.email = 'Email field is required';
    }

    if(!Validator.isMobilePhone(data.phone, ['en-NG'])){
        errors.phone = `${data.phone} is not a valid phone number`;
    }

    if(Validator.isEmpty(data.phone)){
        errors.phone = 'Phone field is required';
    }

    if(Validator.isEmpty(data.password)){
        errors.password = 'Password field is required';
    }

    if(!Validator.isLength(data.password, {min: 6, max: 30})){
        errors.password = 'Password must be at least 6 characters';
    }

    if(Validator.isEmpty(data.password2)){
        errors.password2 = 'Confirm password field is required';
    }

    if(!Validator.equals(data.password, data.password2)){
        errors.password2 = 'Passwords must match';
    }

    
    return {
        errors,
        isValid: isEmpty(errors)
    }
}