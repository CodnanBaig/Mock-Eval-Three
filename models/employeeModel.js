const mongoose = require("mongoose");

const Employee = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true},
    department: {type: String, required: true},
    salary: {type: Number, required: true},
})

module.exports = mongoose.model("Employee", Employee);