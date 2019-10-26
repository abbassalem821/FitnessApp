
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,         //will trim whitespace off of the username
        minlength: 3
    },
}, {
    timestamps: true,       // time stamps of when created/modified
});

const User = mongoose.model('User', userSchema);

module.exports = User;