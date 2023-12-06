const AuthController = require('./AuthController');
const CEA = require('../models/CEAModel');
const MRF = require('../models/MRFModel');
const Supplier = require('../models/SupplierModel');
const Collection = require('../models/CollectionModel');
const Category = require('../models/CategoryModel');
const moment = require('moment');
const Admin = require("../models/AdminModel");

class CEAController {

    async CEADashBoard(req, res) {
        try {
            await AuthController.verifyUser(req, res, async () => {
                res.status(200).json({status: 'success', message: 'Protected route accessed successfully'});
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({status: 'error', message: 'Internal Server Error'});
        }
    }

    async getSumLastDay(req, res) {
        const startOfToday = moment().startOf('day');
        const endOfToday = moment().endOf('day');
        try {
            const categories = await Category.find({
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
        const startOf7DaysAgo = moment().subtract(7, 'days').startOf('day');
        const endOfToday = moment().endOf('day');

        try {
            const categories = await Category.find({
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

    async viewCEAProfile(req, res) {
        try {
            const {userId} = req.params;
            const ceaProfile = await CEA.findOne({userId});
            if (!ceaProfile) {
                return res.status(404).json({status: 'error', message: 'CEA profile not found'});
            }
            res.status(200).json({status: 'success', data: ceaProfile});
        } catch (err) {
            console.error(err);
            res.status(500).json({status: 'error', message: 'Internal Server Error'});
        }
    }

    async getSumsEachDayLastMonth(req, res) {
        const startOf30DaysAgo = moment().subtract(30, 'days').startOf('day');
        const endOfToday = moment().endOf('day');

        try {
            const categories = await Category.find({
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

    async getAllMRFUsers(req, res) {
        try {
            const mrfUsers = await MRF.find({});
            res.status(200).json({status: 'success', data: mrfUsers});
        } catch (err) {
            console.error(err);
            res.status(500).json({status: 'error', message: 'Internal Server Error'});
        }
    }

}

module.exports = new CEAController();
