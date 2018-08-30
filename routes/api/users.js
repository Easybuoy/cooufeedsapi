const express = require('express');
const SECRET_OR_KEY = require('../../config/keys').SECRET_OR_KEY;
const veriftToken = require('../../config/verifyToken');
const bcrypt = require('bcrypt-nodejs');
const router = express.Router();
const jwt = require('jsonwebtoken');

const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

const User = require('../../models/User');

// @route   POST api/users/register
//@desc     Create User
//@access   Public
router.post('/register', (req, res) => {
    const {errors, isValid } = validateRegisterInput(req.body);
    // console.log(req.token);
    //Check validation
    let islecturer, matric_no = 0;
    if(req.body.islecturer){
        islecturer = req.body.islecturer;
    }
    
    if(req.body.matric_no){
        matric_no = req.body.matric_no;
    }

    if(!isValid){
        return res.status(400).json(errors);
    }


    let {password, email, phone} = req.body;
    password = bcrypt.hashSync(password);
    const user = {
    matric_no: matric_no,
    surname: req.body.surname,
    firstname: req.body.firstname,
    email: req.body.email,
    phone: req.body.phone,
    islecturer: islecturer,
    password: password,
    status: 1
    };

    User.findOne({email: email})
    .then((doc) => { 
        if(doc){ 
            errors.email = 'Email already exists';
            return res.status(400).json(errors);
        }else{

            User.findOne({phone: phone})
            .then(result => {
                if(result){
                    errors.phone = `${phone} already used, Kindly input another phone number`;
                    return res.status(400).json(errors); 
                }

                new User(user).save()
            .then((resp) => {
                return res.json({msg: 'User Registered Successfully', 'data': resp});
            })
            .catch((err) => {
                console.log(err);
                return res.status(500).json('Error creating user');
            });

            })
            .catch((err) => {
                console.log(err);
                return res.status(500).json('Error creating user');
            });



            
        }
    })
    .catch((err) => {
        return res.json('error');
    });
});

// @route   GET api/users/login
//@desc     Login User
//@access   Public
router.post('/login', (req, res) => {
    const {errors, isValid } = validateLoginInput(req.body);
    
    if(!isValid){
        return res.status(400).json(errors);
    }
    const {email, password} = req.body;
    User.findOne({email: email, })
    .then((user) => {
        if(!user){
            errors.email = 'User not found';
          return res.status(404).json(errors);
        }

        if(user.status !== 1){
            errors.msg = 'User not active';
            return res.status(404).json(errors);
        }
        //Check password match
        bcrypt.compare(password, user.password, (err, match) => {
                if(err){
                    errors.msg = 'Unable to login, please try again';
                    return res.status(400).json(errors);
                }

                if(match === false){
                    errors.password = 'Incorrect Password';
                    return res.status(401).json(errors);
                }
                const payload = {
                    id: user._id,
                    email: user.email,
                    phone: user.phone,
                    surname: user.surname,
                    firstname: user.firstname,
                    islecturer: user.islecturer,
                    status: user.status
                };

                //Sign token
                jwt.sign(payload, SECRET_OR_KEY, (err, token) => {
                    if(err){
                        errors.msg = 'Unable To Login. Please try again';
                        return res.status(400).json(errors);
                    }else{
                        return res.json({
                            sucess: true,
                            token: `Bearer ${token}`
                        });
                    }
                });
        })
    }).catch((err) => {
        errors.msg = 'Unable To Login. Please try again';
        return res.status(400).json(errors);
    });


 });

//  // @route   POST api/lecture/cancel
// //@desc     Cancel Lecture
// //@access   Private
// router.post('/cancel', (req, res) => {
//     // console.log(req.body)
//     Lecture.findOne({_id: req.body.id})
//     .then(lecture => {
        
//         if(lecture){
//            lecture.status = 2;
//            lecture.save().then(lecture => res.json({msg: 'Lecture Cancelled Sucessfully'}))
//         }else{
//             return res.status(400).json({msg: "No lecture found"});
//         }
//     })
//     .catch(err => {
//         res.status(400).json({msg: "Error cancelling lecture, please try again."});
//     });
//  });

module.exports = router;
