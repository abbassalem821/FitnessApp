const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());              // allows us to parse JSON 

const uri = process.env.ATLAS_URI;      //uri is the name of the databse that we'll be getting from atlas 
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true});
const connection = mongoose.connection;
connection.once('open', () => {     //once the connection is open, it will log statement below
    console.log("MongoDB database connection established successfully");
})

const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);



app.listen(port, () => {                // what starts the server, on a certain port
    console.log(`Server is running on the port: ${port}`);
});