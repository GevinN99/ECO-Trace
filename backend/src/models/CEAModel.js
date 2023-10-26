const mongoose = require('mongoose');

const CEASchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    employeeId: {
        type: String,
        required: true
    },
    occupation: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true,
        unique: true,
    },
    userId: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});

const CEA = mongoose.model('CEA', CEASchema);
module.exports = CEA;
