const express = require('express');
const SENDGRID_API_KEY = require('../../config/keys').SENDGRID_API_KEY;
const validateRegisterInput = require('../../validation/register');

const router = express.Router();

const User = require('../../models/User');

// @route   POST api/users/register
//@desc     Create User
//@access   Public
router.post('/register', (req, res) => {
    const {errors, isValid } = validateRegisterInput(req.body);

    //Check validation
    if(!isValid){
        return res.status(400).json(errors);
    }

        return res.json('passed')
    // const lecture ={
    // course_code: req.body.course_code,
    // course_title: req.body.course_title,
    // level: req.body.level,
    // status: 1,
    // }

    // new Lecture(lecture).save()
    // .then(lecture => res.json({msg: 'Lecture created', 'data': lecture}))
    // .catch(err => {
    //     // console.log(err)
    //     // res.status(400).json(err);
    //     res.status(400).json({msg: "Unable to create lecture at this time"});
    // })
});

// @route   GET api/lecture/
//@desc     Get list of all lectures
//@access   Public
router.get('/', (req, res) => {
    Lecture.find({status: 1})
    .then(lectures => {
        
        if(lectures.length > 0){
           return res.json(lectures);
        }else{
            return res.json({msg: "No active lectures at this time"});
        }
    })
    .catch(err => {
        res.status(400).json({msg: "Error getting lectures, please try again."});
    });
 });

 // @route   POST api/lecture/cancel
//@desc     Cancel Lecture
//@access   Private
router.post('/cancel', (req, res) => {
    // console.log(req.body)
    Lecture.findOne({_id: req.body.id})
    .then(lecture => {
        
        if(lecture){
           lecture.status = 2;
           lecture.save().then(lecture => res.json({msg: 'Lecture Cancelled Sucessfully'}))
        }else{
            return res.status(400).json({msg: "No lecture found"});
        }
    })
    .catch(err => {
        res.status(400).json({msg: "Error cancelling lecture, please try again."});
    });
 });

module.exports = router;