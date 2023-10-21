const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mrfAdminSchema = new Schema({
    mrf_name: {
        type: String,
        required: true,
        maxlength: 20,
    },
    mrf_address: {
        type: String,
    },
    mrf_contact: {
        type: Number,
        maxlength: 10,
    },
    mrf_password: {
        type: String,
        required: true,
    },
});

const mrfAdmin = mongoose.model("mrfAdmin", mrfAdminSchema);

module.exports = mrfAdmin;