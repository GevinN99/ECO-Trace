const mongoose = require('mongoose');

const CollectionSchema = new mongoose.Schema({
    supplierId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    amountPaid: {
        type: Number,
        required: true
    },
}, {
    timestamps: true
});

const Collection = mongoose.model('Collection', CollectionSchema);
module.exports = Collection;
