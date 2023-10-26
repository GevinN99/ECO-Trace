bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const saltRounds = 10;

class UserController {
    async register(req, res) {
        try {
            const { firstName, lastName, type, userName, password } = req.body;
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            let idPrefix = '';
            switch (type) {
                case 'Admin':
                    idPrefix = 'AD';
                    break;
                case 'CEA':
                    idPrefix = 'CEA';
                    break;
                case 'MRF':
                    idPrefix = 'MRF';
                    break;
                default:
                    idPrefix = '';
            }

            let tempUserName = userName;
            let count = 1;
            let user = await User.findOne({ userName: tempUserName });
            while (user) {
                tempUserName = `${userName}-${Math.floor(Math.random() * 100) + 1}`;
                user = await User.findOne({ userName: tempUserName });
                count++;
                if (count > 100) {
                    return res.status(400).json({ status: 'error', message: 'Cannot generate a unique username' });
                }
            }

            const paddedCount = (count + 1).toString().padStart(4, '0');
            const userId = idPrefix + paddedCount;

            const values = {
                firstName,
                lastName,
                type,
                userName: tempUserName,
                password: hashedPassword,
                userId
            };

            const existingUser = await User.findOne({ userId });
            if (existingUser) {
                return res.status(400).json({ status: 'error', message: 'User ID already exists' });
            }

            await User.create(values);
            res.status(200).json({ status: 'success', message: 'User Added.' });
        } catch (err) {
            console.error(err);
            res.status(500).json({ status: 'error', message: 'Error with Adding User.' });
        }
    }


    async login(req, res) {
        const {userName, password} = req.body;
        try {
            const user = await User.findOne({userName});
            if (!user) {
                return res.status(404).json({ status: 'error', message: 'User not found' });
            }

            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) {
                return res.status(401).json({status: 'error', message: 'Invalid password'});
            } else {
                const firstName = user.firstName;
                const token = jwt.sign({firstName}, process.env.JWT_SECRET, {expiresIn: '1d'});
                return res.cookie('token', token, {httpOnly: true}).status(200).json({status: 'success', message: 'Login successful'});
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({status: 'error', message: 'Error with login', error: err.message});
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
