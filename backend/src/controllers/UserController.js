const User = require('../models/User');

class UserController {
    async addNewUser(req, res) {
        try {
            const { firstName, lastName, type, user_password } = req.body;
            const newUser = new User({
                firstName,
                lastName,
                type,
                user_password,
            });
            await newUser.save();
            res.status(200).json({ status: 'success', message: 'User Added.' });
        } catch (err) {
            console.error(err);
            res.status(500).json({ status: 'error', message: 'Error with Adding User.' });
        }
    }

    async getAllUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users);
        } catch (err) {
            console.error(err);
            res.status(500).json({ status: 'error', message: 'Error with fetching data' });
        }
    }

    async getUserById(req, res) {
        try {
            const userId = req.params.id;
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ status: 'error', message: 'User not found' });
            }
            res.json(user);
        } catch (err) {
            console.error(err);
            res.status(500).json({ status: 'error', message: 'Error with fetching data' });
        }
    }

    async updateUser(req, res) {
        try {
            const userId = req.params.id;
            const { firstName, lastName, type, user_password } = req.body;
            const updateUser = {
                firstName,
                lastName,
                type,
                user_password,
            };
            const updatedUser = await User.findByIdAndUpdate(userId, updateUser, { new: true });
            if (!updatedUser) {
                return res.status(404).json({ status: 'error', message: 'User not found' });
            }
            res.status(200).json({ status: 'success', message: 'User Updated', user: updatedUser });
        } catch (err) {
            console.error(err);
            res.status(500).json({ status: 'error', message: 'Error with updating data' });
        }
    }

    async deleteUser(req, res) {
        try {
            const userId = req.params.id;
            const deletedUser = await User.findByIdAndDelete(userId);
            if (!deletedUser) {
                return res.status(404).json({ status: 'error', message: 'User not found' });
            }
            res.status(200).json({ status: 'success', message: 'User Deleted' });
        } catch (err) {
            console.error(err.message);
            res.status(500).json({ status: 'error', message: 'Error with Deleting data', error: err.message });
        }
    }
}

module.exports = new UserController();
