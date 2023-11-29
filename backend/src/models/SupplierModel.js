const mongoose = require('mongoose');

const SupplierSchema = new mongoose.Schema({
    supplierName: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true,
    },
    supplierId: {
        type: String,
        required: true
    },
    supplierAddress: {
        type: String,
        required: true
    },
    supplierContact: {
        type: Number,
        required: true
    },
    supplierEmail: {
        type: String,
    },
    supplierType: {
        type: String,
        required: true
    },
});

const Supplier = mongoose.model('Supplier', SupplierSchema);
module.exports = Supplier;
