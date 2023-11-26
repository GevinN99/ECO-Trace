const express = require('express');
const router = express.Router();
const CEAController = require('../controllers/CEAController');

router.get('/CEADashBoard', CEAController.CEADashBoard);

module.exports = router;