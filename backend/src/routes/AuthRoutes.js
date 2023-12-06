const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');

router.post('/adminRegister', AuthController.adminRegister);
router.put('/updateAdmin/:userId', AuthController.updateAdmin);
router.post('/ceaRegister', AuthController.ceaRegister)
router.put('/updateCEA/:userId', AuthController.updateCEA);
router.post('/mrfRegister', AuthController.mrfRegister);
router.post('/login', AuthController.login);
router.post('/verifyUser', AuthController.verifyUser);
router.get('/logout', AuthController.logout);

module.exports = router;
