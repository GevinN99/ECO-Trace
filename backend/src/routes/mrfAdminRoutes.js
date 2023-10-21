const express = require('express');
const router = express.Router();
const mrfAdminController = require('../controllers/mrfAdminController');

// Add new mrfAdmin
router.route('/addNewMRFAdmin').post(mrfAdminController.addNewMRFAdmin);

// Get all mrfAdmins
router.route('/getAllMRFAdmins').get(mrfAdminController.getAllMRFAdmins);

// Get mrfAdmin by id
router.route('/getMRFAdminById/:id').get(mrfAdminController.getMRFAdminById);

// Update mrfAdmin
router.route('/updateMRFAdmin/:id').put(mrfAdminController.updateMRFAdmin);

// Delete mrfAdmin
router.route('/deleteMRFAdmin/:id').delete(mrfAdminController.deleteMRFAdmin);

module.exports = router;