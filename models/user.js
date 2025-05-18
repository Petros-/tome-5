// for defining the structure of users or accounts
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    password: {type: String, required: true},
    email: {type: String, required: true},
    // set the roles property to an array of strings
    // with the default as one entry, the string: 'user' (the user role)
    roles: {type: [String], required: true, default: ['user']}
});

const User = mongoose.model("User", userSchema);

module.exports = User;