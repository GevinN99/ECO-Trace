const AuthController = require('./AuthController');
const MRF = require('../models/MRFModel');
const Supplier = require('../models/SupplierModel');
const Collection = require('../models/CollectionModel');

class MRFController {

    async MRFDashBoard(req, res) {
        try {
            await AuthController.verifyUser(req, res, async () => {
                res.status(200).json({status: 'success', message: 'Protected route accessed successfully'});
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({status: 'error', message: 'Internal Server Error'});
        }
    }

    async viewMRFProfile(req, res) {
        try {
            const {userId} = req.params;
            const mrfProfile = await MRF.findOne({userId});

            if (!mrfProfile) {
                return res.status(404).json({status: 'error', message: 'MRF profile not found'});
            }

            res.status(200).json({status: 'success', data: mrfProfile});
        } catch (err) {
            console.error(err);
            res.status(500).json({status: 'error', message: 'Internal Server Error'});
        }
    }

    async updateMRFDetails(req, res) {
        try {
            const {userId} = req.params;
            const updatedDetails = req.body;

            const updatedMRF = await MRF.findOneAndUpdate({userId}, updatedDetails, {new: true});

            if (!updatedMRF) {
                return res.status(404).json({status: 'error', message: 'MRF profile not found'});
            }

            res.status(200).json({status: 'success', data: updatedMRF});
        } catch (err) {
            console.error(err);
            res.status(500).json({status: 'error', message: 'Internal Server Error'});
        }
    }

    async createCollection(req, res) {
        try {
            const { userId, supplierId, quantity, amountPaid } = req.body;

            const mrfUser = await MRF.findOne({ userId });
            console.log(mrfUser);
            if (!mrfUser) {
                return res.status(404).json({ status: 'error', message: 'MRF user not found' });
            }

            const supplier = await Supplier.findOne({ supplierId });
            if (!supplier) {
                return res.status(404).json({ status: 'error', message: 'Supplier not found' });
            }

            const newCollection = new Collection({
                userId,
                supplierId,
                quantity,
                amountPaid,
            });

            await newCollection.save();

            res.status(201).json({status: 'success', data: newCollection});
        } catch (err) {
            console.error('Error in createCollection:', err);
            res.status(500).json({status: 'error', message: 'Internal Server Error'});
        }
    }

    async createSupplier(req, res) {
        const { userId, supplierName, supplierId, supplierAddress, supplierContact, supplierEmail, supplierType } = req.body;

        try {
            const newSupplier = new Supplier({
                userId,
                supplierName,
                supplierId,
                supplierAddress,
                supplierContact,
                supplierEmail,
                supplierType
            });

            await newSupplier.save();

            res.status(201).json({
                status: 'success',
                message: 'Supplier created successfully',
                data: newSupplier
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({
                status: 'error',
                message: 'An error occurred while creating the supplier'
            });
        }
    }

    async generateSupplierId(req, res) {
        try {
            const lastSupplier = await Supplier.findOne().sort({ supplierId: -1 });
            const lastIdNumber = lastSupplier ? parseInt(lastSupplier.supplierId.slice(1)) : 0;
            const newIdNumber = lastIdNumber + 1;
            const newId = 's' + String(newIdNumber).padStart(3, '0');

            res.status(200).json({
                status: 'success',
                supplierId: newId
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({
                status: 'error',
                message: 'An error occurred while generating the supplier ID'
            });
        }
    }

    //For Admin Page
    async getAllSuppliers(req, res) {
        try {
            const suppliers = await Supplier.find();
            res.status(200).json({
                status: 'success',
                data: suppliers
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({
                status: 'error',
                message: 'An error occurred while fetching the suppliers'
            });
        }
    }

    //For MRF Dashboard
    async getUserSuppliers(req, res) {
        const { userId } = req.params;

        try {
            const suppliers = await Supplier.find({ userId });
            res.status(200).json({
                status: 'success',
                data: suppliers
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({
                status: 'error',
                message: 'An error occurred while fetching the suppliers'
            });
        }
    }

}

module.exports = new MRFController();