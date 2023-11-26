const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/AdminController');

router.get('/AdminDashBoard', AdminController.AdminDashBoard);

module.exports = router;