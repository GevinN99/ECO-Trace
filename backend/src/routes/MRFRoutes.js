const express = require('express');
const router = express.Router();
const MRFController = require('../controllers/MRFController');

router.get('/MRFDashBoard', MRFController.MRFDashBoard);
router.get('/viewMRFProfile/:userId', MRFController.viewMRFProfile);
router.put('/updateMRFDetails/:userId', MRFController.updateMRFDetails);
router.post('/createCollection', MRFController.createCollection);
router.post('/createSupplier', MRFController.createSupplier);
router.get('/generateSupplierId', MRFController.generateSupplierId);
router.get('/getAllSuppliers', MRFController.getAllSuppliers);
router.get('/getUserSuppliers/:userId', MRFController.getUserSuppliers);

module.exports = router;