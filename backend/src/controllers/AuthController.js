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
            const {
                firstName,
                lastName,
                address,
                employeeId,
                occupation,
                userName,
                password
            } = req.body;
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            // Check if the username already exists in the database
            let user = await CEA.findOne({userName: userName});

            if (user) {
                return res.status(400).json({status: 'error', message: 'Username already exists'});
            }

            let idPrefix = 'CEA';
            let count = 1;
            let tempUserId = idPrefix + count.toString().padStart(4, '0');
            user = await CEA.findOne({userId: tempUserId});

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

            let user = await MRF.findOne({userName: userName});

            if (user) {
                return res.status(400).json({status: 'error', message: 'Username already exists'});
            }

            let idPrefix = 'MRF';
            let count = 1;
            let tempUserId = idPrefix + count.toString().padStart(4, '0');
            user = await MRF.findOne({userId: tempUserId});

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

    async verifyUser(req, res, next) {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({status: 'error', message: 'Unauthorized'});
        } else {
            jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({status: 'error', message: 'Error with Verifying User'});
                } else {
                    req.user = decoded;
                    next();
                }
            });
        }
    }

    logout(req, res) {
        res.clearCookie('token').json({status: 'success', message: 'Logout successful'});
    }

    async login(req, res) {
        const { userName, password } = req.body;
        try {
            const mrfUser = await MRF.findOne({ userName });
            const ceaUser = await CEA.findOne({ userName });
            const adminUser = await Admin.findOne({ userName });
            let user;
            let role;
            if (mrfUser) {
                user = mrfUser;
                role = 'MRF';
            } else if (ceaUser) {
                user = ceaUser;
                role = 'CEA';
            } else if (adminUser) {
                user = adminUser;
                role = 'Admin';
            } else {
                return res.status(404).json({ status: 'error', message: 'User not found' });
            }
            if (!user.password) {
                return res.status(401).json({ status: 'error', message: 'Password not set for the user' });
            }
            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) {
                return res.status(401).json({ status: 'error', message: 'Invalid password' });
            } else {
                const firstName = user.firstName;
                const lastName = user.lastName;
                const userName = user.userName;
                const userId = user.userId;
                const token = jwt.sign({
                    firstName,
                    lastName,
                    userName,
                    userId,
                    role
                }, process.env.JWT_SECRET, {expiresIn: '1d'});
                return res.cookie('token', token, {httpOnly: true}).status(200).json({
                    status: 'success',
                    message: 'Login successful',
                    role,
                    userId,
                });
            }
        } catch (err) {
            console.error(err);
            if (err.name === 'MongoError') {
                res.status(500).json({ status: 'error', message: 'Database Error', error: err.message });
            } else if (err.name === 'JsonWebTokenError') {
                res.status(500).json({ status: 'error', message: 'JWT Error', error: err.message });
            } else {
                res.status(500).json({ status: 'error', message: 'Unknown Server Error', error: err.message });
            }
        }
    };



}

module.exports = new AuthController();
