const express = require('express');
const router = express.Router();
const MRFController = require('../controllers/MRFController');

router.get('/MRFDashBoard', MRFController.MRFDashBoard);

module.exports = router;