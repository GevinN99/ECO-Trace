const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/AdminController');

// Add new admin
router.route('/addNewAdmin').post(AdminController.addNewAdmin);

// Get all admins
router.route('/getAllAdmins').get(AdminController.getAllAdmins);

// Get admin by id
router.route('/getAdminById/:id').get(AdminController.getAdminById);

// Update admin
router.route('/updateAdmin/:id').put(AdminController.updateAdmin);

// Delete admin
router.route('/deleteAdmin/:id').delete(AdminController.deleteAdmin);

module.exports = router;