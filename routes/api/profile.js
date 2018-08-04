const express = require('express');


const router = express.Router();

const Profile = require('../../models/User');


router.post('/', (req, res) => {
   const profile ={
    surname: req.body.surname,
    }

    new Profile(profile).save()
    .then(profile => res.json(profile))
    .catch(err => {
        // console.log(err)
        res.json(err)
    })
});

module.exports = router;