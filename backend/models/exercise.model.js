
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:5000/exercises/')
const Schema = mongoose.Schema;
const exerciseSchema = new Schema({
    username: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: Number, required: true },
    date: { type: Date, required: true },
}, {
    timestamps: true,       // time stamps of when created/modified
});

const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = Exercise;