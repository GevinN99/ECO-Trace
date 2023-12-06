const AuthController = require('./AuthController');
const Admin = require('../models/AdminModel');
const MRF = require("../models/MRFModel");
const CEA = require("../models/CEAModel");

class AdminController {

    async AdminDashBoard(req, res) {
        try {
            await AuthController.verifyUser(req, res, async () => {
                res.status(200).json({status: 'success', message: 'Protected route accessed successfully'});
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({status: 'error', message: 'Internal Server Error'});
        }
    }

    async viewAdminProfile(req, res) {
        try {
            const {userId} = req.params;
            const adminProfile = await Admin.findOne({userId});
            if (!adminProfile) {
                return res.status(404).json({status: 'error', message: 'Admin profile not found'});
            }
            res.status(200).json({status: 'success', data: adminProfile});
        } catch (err) {
            console.error(err);
            res.status(500).json({status: 'error', message: 'Internal Server Error'});
        }
    }

    async getAllAdmins(req, res) {
        try {
            const admins = await Admin.find({});
            res.status(200).json({status: 'success', data: admins});
        } catch (err) {
            console.error(err);
            res.status(500).json({status: 'error', message: 'Internal Server Error'});
        }
    }

    async getAdmin(req, res) {
        try {
            const {userId} = req.params;
            const admin = await Admin.findOne({userId});
            if (!admin) {
                return res.status(404).json({status: 'error', message: 'Admin not found'});
            }
            res.status(200).json({status: 'success', data: admin});
        } catch (err) {
            console.error(err);
            res.status(500).json({status: 'error', message: 'Internal Server Error'});
        }
    }

    async deleteAdmin(req, res) {
        try {
            const {userId} = req.params;
            const deletedAdmin = await Admin.findOneAndDelete({userId});
            if (!deletedAdmin) {
                return res.status(404).json({status: 'error', message: 'Admin not found'});
            }
            res.status(200).json({status: 'success', message: 'Admin deleted successfully'});
        } catch (err) {
            console.error(err);
            res.status(500).json({status: 'error', message: 'Internal Server Error'});
        }
    }

    async getAllCEAs(req, res) {
        try {
            const CEAs = await CEA.find({});
            res.status(200).json({status: 'success', data: CEAs});
        } catch (err) {
            console.error(err);
            res.status(500).json({status: 'error', message: 'Internal Server Error'});
        }
    }

    async getCEA(req, res) {
        try {
            const {userId} = req.params;
            const cea = await CEA.findOne({userId});
            if (!cea) {
                return res.status(404).json({status: 'error', message: 'CEA not found'});
            }
            res.status(200).json({status: 'success', data: cea});
        } catch (err) {
            console.error(err);
            res.status(500).json({status: 'error', message: 'Internal Server Error'});
        }
    }

    async deleteCEA(req, res) {
        try {
            const {userId} = req.params;
            const deletedCEA = await CEA.findOneAndDelete({userId});
            if (!deletedCEA) {
                return res.status(404).json({status: 'error', message: 'CEA not found'});
            }
            res.status(200).json({status: 'success', message: 'CEA deleted successfully'});
        } catch (err) {
            console.error(err);
            res.status(500).json({status: 'error', message: 'Internal Server Error'});
        }
    }

}

module.exports = new AdminController();