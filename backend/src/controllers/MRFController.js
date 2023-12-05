const AuthController = require('./AuthController');
const MRF = require('../models/MRFModel');
const Supplier = require('../models/SupplierModel');
const Collection = require('../models/CollectionModel');
const Category = require('../models/CategoryModel');
const moment = require('moment');

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

    async createCategory(req, res) {
        const { userId, PET, HDPE, LDPE, PP, PS, PVC } = req.body;

        try {
            const category = new Category({ userId, PET, HDPE, LDPE, PP, PS, PVC });
            await category.save();

            res.status(201).json({
                status: 'success',
                data: {
                    PET: category.PET,
                    HDPE: category.HDPE,
                    LDPE: category.LDPE,
                    PP: category.PP,
                    PS: category.PS,
                    PVC: category.PVC
                }
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({
                status: 'error',
                message: 'An error occurred while creating the category'
            });
        }
    }

    async getSumsEachDayLastMonth(req, res) {
        const { userId } = req.params;
        const startOf30DaysAgo = moment().subtract(30, 'days').startOf('day');
        const endOfToday = moment().endOf('day');

        try {
            const categories = await Category.find({
                userId,
                createdAt: { $gte: startOf30DaysAgo.toDate(), $lte: endOfToday.toDate() }
            }).sort({createdAt: 'asc'});

            const sumsByDay = categories.reduce((acc, category) => {
                const day = moment(category.createdAt).format('YYYY-MM-DD');
                if (!acc[day]) {
                    acc[day] = { PET: 0, HDPE: 0, LDPE: 0, PP: 0, PS: 0, PVC: 0 };
                }
                acc[day].PET += category.PET;
                acc[day].HDPE += category.HDPE;
                acc[day].LDPE += category.LDPE;
                acc[day].PP += category.PP;
                acc[day].PS += category.PS;
                acc[day].PVC += category.PVC;
                return acc;
            }, {});

            res.status(200).json({ status: 'success', data: sumsByDay });
        } catch (err) {
            console.error(err);
            res.status(500).json({ status: 'error', message: 'An error occurred while fetching the sums' });
        }
    }

    async getSumLastDay(req, res) {
        const { userId } = req.params;
        const startOfToday = moment().startOf('day');
        const endOfToday = moment().endOf('day');
        try {
            const categories = await Category.find({
                userId,
                createdAt: { $gte: startOfToday.toDate(), $lte: endOfToday.toDate() }
            });
            const sums = categories.reduce((acc, category) => {
                acc.PET += category.PET;
                acc.HDPE += category.HDPE;
                acc.LDPE += category.LDPE;
                acc.PP += category.PP;
                acc.PS += category.PS;
                acc.PVC += category.PVC;
                return acc;
            }, { PET: 0, HDPE: 0, LDPE: 0, PP: 0, PS: 0, PVC: 0 });
            res.status(200).json({ status: 'success', data: sums });
        } catch (err) {
            console.error(err);
            res.status(500).json({ status: 'error', message: 'An error occurred while fetching the sums' });
        }
    }

    async getSumsLast7Days(req, res) {
        const { userId } = req.params;
        const startOf7DaysAgo = moment().subtract(7, 'days').startOf('day');
        const endOfToday = moment().endOf('day');

        try {
            const categories = await Category.find({
                userId,
                createdAt: {
                    $gte: startOf7DaysAgo.toDate(),
                    $lte: endOfToday.toDate()
                }
            }).sort({createdAt: 'asc'});

            const sumsByDay = categories.reduce((acc, category) => {
                const day = moment(category.createdAt).format('YYYY-MM-DD');
                if (!acc[day]) {
                    acc[day] = { PET: 0, HDPE: 0, LDPE: 0, PP: 0, PS: 0, PVC: 0 };
                }
                acc[day].PET += category.PET;
                acc[day].HDPE += category.HDPE;
                acc[day].LDPE += category.LDPE;
                acc[day].PP += category.PP;
                acc[day].PS += category.PS;
                acc[day].PVC += category.PVC;
                return acc;
            }, {});

            res.status(200).json({ status: 'success', data: sumsByDay });
        } catch (err) {
            console.error(err);
            res.status(500).json({ status: 'error', message: 'An error occurred while fetching the sums' });
        }
    }

}

module.exports = new MRFController();