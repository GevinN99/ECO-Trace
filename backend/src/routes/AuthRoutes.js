const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');


router.post('/adminRegister', AuthController.adminRegister);

router.post('/ceaRegister', AuthController.ceaRegister);

router.post('/mrfRegister', AuthController.mrfRegister);

router.post('/login', AuthController.login);

module.exports = router;
