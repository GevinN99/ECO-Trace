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
router.get('/getAllMRFs', AdminController.getAllMRFs);
router.get('/getMRF/:userId', AdminController.getMRF);
router.delete('/deleteMRF/:userId', AdminController.deleteMRF);
router.get('/getUserSuppliers/:userId', AdminController.getUserSuppliers);
router.put('/updateSupplier/:supplierId', AdminController.updateSupplier);
router.delete('/deleteSupplier/:supplierId', AdminController.deleteSupplier);




module.exports = router;