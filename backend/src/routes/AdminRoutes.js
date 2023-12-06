const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/AdminController');
const MRFController = require("../controllers/MRFController");

router.get('/AdminDashBoard', AdminController.AdminDashBoard);
router.get('/viewAdminProfile/:userId', AdminController.viewAdminProfile);
router.get('/getAllAdmins', AdminController.getAllAdmins);
router.get('/getAdmin/:userId', AdminController.getAdmin);
router.delete('/deleteAdmin/:userId', AdminController.deleteAdmin);
router.get('/getAllCEAs', AdminController.getAllCEAs);
router.get('/getCEA/:userId', AdminController.getCEA);
router.delete('/deleteCEA/:userId', AdminController.deleteCEA);

module.exports = router;