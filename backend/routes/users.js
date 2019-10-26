const router = require('express').Router();     //express router
let User = require('../models/user.model');     //mongoose model

router.route('/').get((req, res) => {           //1st route/in-point that handles http git requests on the /users/ url end path
    User.find()                                 // return all data from Atlas
    .then(users => res.json(users))             //...then return all the users, res.json = return the users in json format
    .catch(err => res.status(400).json('Error: ' + err));   //if theres an error, we return the 400 error 
});

router.route('/add').post((req,res) => {            //if its a post request that ends with /add...
    const username = req.body.username;

    const newUser = new User({username});

    newUser.save()                                                  //user saved to database
        .then(() => res.json('User added!'))                        //afterward, return user added
        .catch(err => res.status(400).json('Error: ' + err));       //else return error message 
});

module.exports = router;