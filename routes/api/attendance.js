const express = require('express');
const SECRET_OR_KEY = require('../../config/keys').SECRET_OR_KEY;
const veriftToken = require('../../config/verifyToken');

const router = express.Router();
const jwt = require('jsonwebtoken');

const validateAttendanceInput = require('../../validation/attendance');

const Attendance = require('../../models/Attendance');
const Lecture = require('../../models/Lecture');

// @route   POST api/attend/
//@desc     Create User
//@access   Public
router.post('/', veriftToken, (req, res) => {
    const {errors, isValid } = validateAttendanceInput(req.body);

    // Check validation
    if(!isValid){
        return res.status(400).json(errors);
    }
    
    jwt.verify(req.token, SECRET_OR_KEY, (err, authData) => { console.log(authData);
        if(err){
           return res.sendStatus(401);
        }else{ 
            Lecture.findById(req.body.lecture_id)
            .then((lecture) => {
                
                // Check if lecture exists
                if(!lecture){
                    errors.msg = 'Lecture not found';
                    return res.status(400).json(errors);
                };    

                //Check if lecture is cancelled
                if(lecture.status === 2){
                    errors.msg = 'Lecture Cancelled';
                    return res.status(400).json(errors);
                };

                let fullname = `${authData.surname} ${authData.firstname}`;
                const attendancedata = {
                    lecture_id: lecture._id,
                    user_id: authData.id,
                    user_name: fullname,
                    status: 1
                };


                Attendance.findOne({lecture_id: lecture._id, user_id: authData.id})
                .then(exist => {
                    // Check if user has already attended class
                    if(exist){
                        return res.status(400).json('Already attended class');
                    }

                    new Attendance(attendancedata).save()
                .then(data => {
                    let msg = `Successfully attended class ${lecture.course_title}`;
                   return res.json({msg});
                })
                .catch(err => {
                  return  res.status(400).json({msg: "Unable to save attendance. Try again"});

                });
                })
                .catch(err => {
                    return  res.status(400).json({msg: "Unable to save attendance. Try again"});

                });
                
                }
            )
            .catch(err =>{
                return  res.status(400).json({msg: "Unable to save attendance. Try again"});
            })

        }
    })
});

module.exports = router;