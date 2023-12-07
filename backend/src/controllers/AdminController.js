const AuthController = require('./AuthController');
const Admin = require('../models/AdminModel');
const MRF = require("../models/MRFModel");
const CEA = require("../models/CEAModel");
const Supplier = require("../models/SupplierModel");

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

    async getAllMRFs(req, res) {
        try {
            const MRFs = await MRF.find({});
            res.status(200).json({status: 'success', data: MRFs});
        } catch (err) {
            console.error(err);
            res.status(500).json({status: 'error', message: 'Internal Server Error'});
        }
    }

    async getMRF(req, res) {
        try {
            const {userId} = req.params;
            const mrf = await MRF.findOne({userId});
            if (!mrf) {
                return res.status(404).json({status: 'error', message: 'MRF not found'});
            }
            res.status(200).json({status: 'success', data: mrf});
        } catch (err) {
            console.error(err);
            res.status(500).json({status: 'error', message: 'Internal Server Error'});
        }
    }

    async deleteMRF(req, res) {
        try {
            const {userId} = req.params;
            const deletedMRF = await MRF.findOneAndDelete({userId});
            if (!deletedMRF) {
                return res.status(404).json({status: 'error', message: 'MRF not found'});
            }
            res.status(200).json({status: 'success', message: 'MRF deleted successfully'});
        } catch (err) {
            console.error(err);
            res.status(500).json({status: 'error', message: 'Internal Server Error'});
        }
    }

    async getUserSuppliers(req, res) {
        const { userId } = req.params;
        try {
            const suppliers = await Supplier.find({ userId });
            res.status(200).json({ status: 'success', data: suppliers });
        } catch (err) {
            console.error(err);
            res.status(500).json({ status: 'error', message: 'An error occurred while fetching the suppliers' });
        }
    }

    async updateSupplier(req, res) {
        const { supplierId } = req.params;
        const updatedSupplier = req.body;
        try {
            const supplier = await Supplier.findOneAndUpdate({ supplierId }, updatedSupplier, { new: true });
            if (!supplier) {
                return res.status(404).json({ status: 'error', message: 'Supplier not found' });
            }
            res.status(200).json({ status: 'success', data: supplier });
        } catch (err) {
            console.error(err);
            res.status(500).json({ status: 'error', message: 'An error occurred while updating the supplier' });
        }
    }

    async deleteSupplier(req, res) {
        const { supplierId } = req.params;
        try {
            const supplier = await Supplier.findOneAndDelete({ supplierId });
            if (!supplier) {
                return res.status(404).json({ status: 'error', message: 'Supplier not found' });
            }
            res.status(200).json({ status: 'success', message: 'Supplier deleted successfully' });
        } catch (err) {
            console.error(err);
            res.status(500).json({ status: 'error', message: 'An error occurred while deleting the supplier' });
        }
    }


}

module.exports = new AdminController();