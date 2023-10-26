bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
const Admin = require('../models/AdminModel');
const MRF = require('../models/MRFModel');
const CEA = require('../models/CEAModel');
dotenv.config();

const saltRounds = 10;

class AuthController {

    async adminRegister(req, res) {
        try {
            const {firstName, lastName, userName, password} = req.body;
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            let idPrefix = 'AD';
            let tempUserName = userName;
            let count = 1;
            let user = await Admin.findOne({userName: tempUserName});
            while (user) {
                tempUserName = `${userName}-${Math.floor(Math.random() * 100) + 1}`;
                user = await Admin.findOne({userName: tempUserName});
                count++;
                if (count > 100) {
                    return res.status(400).json({status: 'error', message: 'Cannot generate a unique username'});
                }
            }

            const paddedCount = (count + 1).toString().padStart(4, '0');
            const userId = idPrefix + paddedCount;

            const values = {
                firstName,
                lastName,
                userName: tempUserName,
                password: hashedPassword,
                userId
            };

            const existingUser = await Admin.findOne({userId});
            if (existingUser) {
                return res.status(400).json({status: 'error', message: 'User ID already exists'});
            }

            await Admin.create(values);
            res.status(200).json({status: 'success', message: 'Admin Added.'});
        } catch (err) {
            console.error(err);
            res.status(500).json({status: 'error', message: 'Error with Adding Admin.'});
        }
    }

    async ceaRegister(req, res) {
        try {
            const {firstName, lastName, address, employeeId, occupation, userName, password} = req.body;
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            let idPrefix = 'CEA';
            let count = 1;
            let tempUserId = idPrefix + count.toString().padStart(4, '0');
            let user = await CEA.findOne({userId: tempUserId});

            while (user) {
                count++;
                tempUserId = idPrefix + count.toString().padStart(4, '0');
                user = await CEA.findOne({userId: tempUserId});

                if (count > 9999) {
                    return res.status(400).json({status: 'error', message: 'Cannot generate a unique User ID'});
                }
            }

            const values = {
                firstName,
                lastName,
                address,
                employeeId,
                occupation,
                userName,
                password: hashedPassword,
                userId: tempUserId
            };

            await CEA.create(values);
            res.status(200).json({status: 'success', message: 'CEA Added.'});
        } catch (err) {
            console.error(err);
            res.status(500).json({status: 'error', message: 'Error with Adding CEA.'});
        }
    }

    async mrfRegister(req, res) {
        try {
            const {
                firstName,
                lastName,
                district,
                localAuthority,
                idOrPassportNumber,
                collectingLocationAddress,
                telephone,
                gpsLocation,
                userName,
                password
            } = req.body;
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            let idPrefix = 'MRF';
            let count = 1;
            let tempUserId = idPrefix + count.toString().padStart(4, '0');
            let user = await MRF.findOne({userId: tempUserId});

            while (user) {
                count++;
                tempUserId = idPrefix + count.toString().padStart(4, '0');
                user = await MRF.findOne({userId: tempUserId});

                if (count > 9999) {
                    return res.status(400).json({status: 'error', message: 'Cannot generate a unique User ID'});
                }
            }

            const values = {
                firstName,
                lastName,
                district,
                localAuthority,
                idOrPassportNumber,
                collectingLocationAddress,
                telephone,
                gpsLocation,
                userName,
                password: hashedPassword,
                userId: tempUserId
            };

            await MRF.create(values);
            res.status(200).json({status: 'success', message: 'MRF Added.'});
        } catch (err) {
            console.error(err);
            res.status(500).json({status: 'error', message: 'Error with Adding MRF.'});
        }
    }

    async login(req, res) {
        const {userName, password} = req.body;
        try {
            const mrfUser = await MRF.findOne({userName});
            const ceaUser = await CEA.findOne({userName});
            const adminUser = await Admin.findOne({userName});

            let user;
            if (mrfUser) {
                user = mrfUser;
            } else if (ceaUser) {
                user = ceaUser;
            } else if (adminUser) {
                user = adminUser;
            } else {
                return res.status(404).json({status: 'error', message: 'User not found'});
            }

            if (!user.password) {
                return res.status(401).json({status: 'error', message: 'Password not set for the user'});
            }

            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) {
                return res.status(401).json({status: 'error', message: 'Invalid password'});
            } else {
                const firstName = user.firstName;
                const token = jwt.sign({firstName}, process.env.JWT_SECRET, {expiresIn: '1d'});
                return res.cookie('token', token, {httpOnly: true}).status(200).json({
                    status: 'success',
                    message: 'Login successful'
                });
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({status: 'error', message: 'Error with login', error: err.message});
        }
    }

}

module.exports = new AuthController();
