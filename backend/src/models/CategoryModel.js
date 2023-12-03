const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    PET: {
        type: Number,
    },
    HDPE: {
        type: Number,
    },
    LDPE: {
        type: Number,
    },
    PP: {
        type: Number,
    },
    PS: {
        type: Number,
    },
    PVC: {
        type: Number,
    },
}, {
    timestamps: true
});

const Category = mongoose.model('Category', CategorySchema);
module.exports = Category;
