const mongoose = require('mongoose');

const MRFSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
    },
    district: {
        type: String,
        required: true
    },
    localAuthority: {
        type: String,
        required: true
    },
    idOrPassportNumber: {
        type: String,
        required: true
    },
    collectingLocationAddress: {
        type: String,
        required: true
    },
    telephone: {
        type: String,
    },
    gpsLocation: {
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

const MRF = mongoose.model('MRF', MRFSchema);
module.exports = MRF;
