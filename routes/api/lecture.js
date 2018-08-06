const express = require('express');
const SENDGRID_API_KEY = require('../../config/keys').SENDGRID_API_KEY;
const fs = require('fs');
const encode = require('nodejs-base64-encode');

const router = express.Router();

const Lecture = require('../../models/Lecture');

// @route   POST api/lecture/
//@desc     Create Lecture
//@access   Public
router.post('/', (req, res) => {
    const lecture ={
    course_code: req.body.course_code,
    course_title: req.body.course_title,
    level: req.body.level,
    status: 1,
    }

    new Lecture(lecture).save()
    .then(lecture => res.json({msg: 'Lecture created', 'data': lecture}))
    .catch(err => {
        // console.log(err)
        // res.status(400).json(err);
        res.status(400).json({msg: "Unable to create lecture at this time"});
    })
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


 // @route   POST api/lecture/cancel
//@desc     Cancel Lecture
//@access   Private
router.post('/mail', (req, res) => {
// console.log(SENDGRID_API_KEY)
let cont = '';
let route = (__dirname + '/COVER.docx');
console.log(route)
// fs.readFile(route, (err, data) => {
   
//     console.log(data)
//     console.log(err)
//         if(err){
//             return res.json(err);
//         }

//         cont = data;

//     });
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(SENDGRID_API_KEY);
    // 
    const msg = {
      to: 'ekunolaeasybuoy@gmail.com',
      from: 'test@example.com',
      subject: 'Sending with SendGrid is Fun',
      text: 'and easy to do anywhere, even with Node.js',
      html: '<strong>and easy to do anywhere, even with Node.js</strong>',
      attachments: [
        {
          content: new Buffer('Some content here').toString('base64'),
        //   content: cont,
        //   filename: 'Report.pdf',
        //   type: 'application/pdf',
        //   disposition: 'attachment',
        //   content_id: 'Report '
        filename: 'some-attachment.docx',
        type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        disposition: 'attachment',
        content_id: 'mytext',
        templateId: 'd-870e182c4c6349e7bf2481d86e459d12',
        substitutions: {
        name: 'Some One',
        date: '2018-08-06',
        class: 'GNS121',
        level: '200'
        },
        },
      ],
    };
    console.log(msg.attachments[0].content);
    // console.log(encode.encode('Some base 64 encoded attachment content','base64'))
   let a = sgMail.send(msg)

       return res.json(a);
   



    // console.log(Buffer.from("Hello World").toString('base64'));
    // let me =  msg.attachments[0].content = Buffer.from(msg.attachments[0].content).toString('base64');
    // console.log(me)
//     sgMail.send(msg)
//     .then((res) => {
//         console.log('eee')
//        return res.json('Mail sent successfully')
//     }
// )
//     .catch((err) => res.json(err));
 
    
});

 



module.exports = router;