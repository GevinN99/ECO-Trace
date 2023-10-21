const mrfAdmin = require('../models/mrfAdmin');

class mrfAdminController {

    //Add new mrfAdmin
    async addNewMRFAdmin(req, res) {
        try {
            const { mrf_name, mrf_address, mrf_contact, mrf_password } = req.body;
            const newmrfAdmin = new mrfAdmin({
                mrf_name,
                mrf_address,
                mrf_contact,
                mrf_password,
            });
            await newmrfAdmin.save();
            res.status(200).json({ status: 'success', message: 'mrfAdmin Added.' });
        } catch (err) {
            console.error(err);
            res.status(500).json({ status: 'error', message: 'Error with Adding mrfAdmin.' });
        }
    }

    //Get all mrfAdmins
    async getAllMRFAdmins(req, res) {
        try {
            const mrfAdmins = await mrfAdmin.find();
            res.json(mrfAdmins);
        } catch (err) {
            console.error(err);
            res.status(500).json({ status: 'error', message: 'Error with fetching data' });
        }
    }

    //Get mrfAdmin by id
    async getMRFAdminById(req, res) {
        try {
            const mrfAdminId = req.params.id;
            const mrfAdminData = await mrfAdmin.findById(mrfAdminId);
            if (!mrfAdminData) {
                return res.status(404).json({ status: 'error', message: 'mrfAdmin not found' });
            }
            res.json(mrfAdminData);
        } catch (err) {
            console.error(err);
            res.status(500).json({ status: 'error', message: 'Error with fetching data' });
        }
    }

    //Update mrfAdmin
    async updateMRFAdmin(req, res) {
        try {
            const mrfAdminId = req.params.id;
            const { mrf_name, mrf_address, mrf_contact, mrf_password } = req.body;
            const updatemrfAdmin = {
                mrf_name,
                mrf_address,
                mrf_contact,
                mrf_password,
            };
            const updatedmrfAdmin = await mrfAdmin.findByIdAndUpdate(mrfAdminId, updatemrfAdmin, { new: true });
            if (!updatedmrfAdmin) {
                return res.status(404).json({ status: 'error', message: 'mrfAdmin not found' });
            }
            res.status(200).json({ status: 'success', message: 'mrfAdmin Updated', mrfAdmin: updatedmrfAdmin });
        } catch (err) {
            console.error(err);
            res.status(500).json({ status: 'error', message: 'Error with updating data' });
        }
    }

    //Delete mrfAdmin
    async deleteMRFAdmin(req, res) {
        try {
            const mrfAdminId = req.params.id;
            const deletedmrfAdmin = await mrfAdmin.findByIdAndDelete(mrfAdminId);
            if (!deletedmrfAdmin) {
                return res.status(404).json({ status: 'error', message: 'mrfAdmin not found' });
            }
            res.status(200).json({ status: 'success', message: 'mrfAdmin Deleted' });
        } catch (err) {
            console.error(err);
            res.status(500).json({ status: 'error', message: 'Error with deleting data' });
        }
    }
}

module.exports = new mrfAdminController();