const express = require('express');
const router = express.Router();
const CEAController = require('../controllers/CEAController');

router.get('/CEADashBoard', CEAController.CEADashBoard);
router.get('/getSumLastDay', CEAController.getSumLastDay);
router.get('/getSumsLast7Days', CEAController.getSumsLast7Days);
router.get('/viewCEAProfile/:userId', CEAController.viewCEAProfile);
router.get('/getSumsEachDayLastMonth', CEAController.getSumsEachDayLastMonth);
router.get('/getAllMRFUsers', CEAController.getAllMRFUsers);

module.exports = router;