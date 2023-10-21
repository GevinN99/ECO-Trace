const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

// Add new user
router.post('/addNewUser', UserController.addNewUser);

// Get all users
router.get('/getAllUsers', UserController.getAllUsers);

// Get user by id
router.get('/getUserById/:id', UserController.getUserById);

// Update user
router.put('/updateUser/:id', UserController.updateUser);

// Delete user
router.delete('/deleteUser/:id', UserController.deleteUser);

module.exports = router;
