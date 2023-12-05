const express = require('express');
const router = express.Router();
const MRFController = require('../controllers/MRFController');

router.get('/MRFDashBoard', MRFController.MRFDashBoard);
router.get('/viewMRFProfile/:userId', MRFController.viewMRFProfile);
router.put('/updateMRFDetails/:userId', MRFController.updateMRFDetails);
router.post('/createCollection', MRFController.createCollection);
router.post('/createSupplier', MRFController.createSupplier);
router.get('/generateSupplierId', MRFController.generateSupplierId);
router.get('/getUserSuppliers/:userId', MRFController.getUserSuppliers);
router.post('/createCategory', MRFController.createCategory);
router.get('/getSumsEachDayLastMonth/:userId', MRFController.getSumsEachDayLastMonth);
router.get('/getSumLastDay/:userId', MRFController.getSumLastDay);
router.get('/getSumsLast7Days/:userId', MRFController.getSumsLast7Days);


module.exports = router;