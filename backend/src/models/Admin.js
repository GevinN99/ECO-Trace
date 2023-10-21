const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminSchema = new Schema({
    admin_id: {
        type: Number,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
        maxlength: 20,
    },
    lastName: {
        type: String,
    },
    password: {
        type: String,
        required: true,
        minlength: 12,
    }
});

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;