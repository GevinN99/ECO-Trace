const Admin = require('../models/Admin');

class AdminController {
    async addNewAdmin(req, res) {
        try {
            const { admin_id, firstName, lastName, password } = req.body;
            const newAdmin = new Admin({
                admin_id,
                firstName,
                lastName,
                password,
            });
            await newAdmin.save();
            res.status(200).json({ status: 'success', message: 'Admin Added.' });
        } catch (err) {
            console.error(err);
            res.status(500).json({ status: 'error', message: 'Error with Adding Admin.' });
        }
    }

    async getAllAdmins(req, res) {
        try {
            const admins = await Admin.find();
            res.json(admins);
        } catch (err) {
            console.error(err);
            res.status(500).json({ status: 'error', message: 'Error with fetching data' });
        }
    }

    async getAdminById(req, res) {
        try {
            const adminId = req.params.id;
            const admin = await Admin.findById(adminId);
            if (!admin) {
                return res.status(404).json({ status: 'error', message: 'Admin not found' });
            }
            res.json(admin);
        } catch (err) {
            console.error(err);
            res.status(500).json({ status: 'error', message: 'Error with fetching data' });
        }
    }

    async updateAdmin(req, res) {
        try {
            const adminId = req.params.id;
            const { admin_id, firstName, lastName, password } = req.body;
            const updateAdmin = {
                admin_id,
                firstName,
                lastName,
                password,
            };
            const updatedAdmin = await Admin.findByIdAndUpdate(adminId, updateAdmin, { new: true });
            if (!updatedAdmin) {
                return res.status(404).json({ status: 'error', message: 'Admin not found' });
            }
            res.status(200).json({ status: 'success', message: 'Admin Updated', admin: updatedAdmin });
        } catch (err) {
            console.error(err);
            res.status(500).json({ status: 'error', message: 'Error with updating data' });
        }
    }

    async deleteAdmin(req, res) {
        try {
            const adminId = req.params.id;
            const deletedAdmin = await Admin.findByIdAndDelete(adminId);
            if (!deletedAdmin) {
                return res.status(404).json({status: 'error', message: 'Admin not found'});
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({status: 'error', message: 'Error with deleting data'});
        }
    }
}

module.exports = new AdminController();