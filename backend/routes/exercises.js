const router = require('express').Router();             //express router
let Exercise = require('../models/exercise.model');     //mongoose model

router.route('/').get((req, res) => {           //1st route/in-point that handles http git requests on the /exercises/ url end path
    Exercise.find()                                 // return all data from Atlas
    .then(exercises => res.json(exercises))     //...then return all the exercises, res.json = return the exercise in json format
    .catch(err => res.status(400).json('Error: ' + err));   //if theres an error, we return the 400 error 
});

router.route('/add').post((req,res) => {            //if its a post request that ends with /add...
    const username = req.body.username;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);

    const newExercise = new Exercise({
        username,
        description,
        duration,
        date,
    });

    newExercise.save()                                              //user saved to database
        .then(() => res.json('Exercise added!'))                    //afterward, return exercise added
        .catch(err => res.status(400).json('Error: ' + err));       //else return error message 
});

router.route('/:id').get((req,res) => {                             //  '/:id' is an object id created automatically by MongoDB
    Exercise.findById(req.params.id)
    .then(exercise => res.json(exercise))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req,res) => {
    Exercise.findByIdAndDelete(req.params.id)
      .then(() => res.json('Exercise deleted'))
      .catch(err => res.status(400).json('Error: ' + err));
});


//taking all of the information and assigning it to the fields of the exercise that already exists
router.route('/update/:id').post((req,res) => {         // this route needs to receive a json object (look 3 lines below)
    Exercise.findById(req.params.id)                         // json obj that will contain a username, description, duration, and a date
        .then(exercise => {                             // this is the exercise that we get from the database 
            exercise.username = req.body.username;      // set username of exercise to = req.body.username bc route on line 40 needs json obj
            exercise.description = req.body.description;                                            
            exercise.duration = Number(req.body.duration);
            exercise.date = Date.parse(req.body.date);

            exercise.save()
                .then(() => res.json('Exercise updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
})

module.exports = router;