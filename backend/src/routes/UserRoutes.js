const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

// Register new user
router.post('/register', UserController.register);

// Get all users
router.post('/login', UserController.login);

// Update user
router.put('/updateUser/:id', UserController.updateUser);

// Delete user
router.delete('/deleteUser/:id', UserController.deleteUser);

module.exports = router;
