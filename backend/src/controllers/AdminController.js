const AuthController = require('./AuthController');
const Admin = require('../models/AdminModel');

class AdminController {

    async AdminDashBoard(req, res) {
        try {
            await AuthController.verifyUser(req, res, async () => {
                res.status(200).json({status: 'success', message: 'Protected route accessed successfully'});
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({status: 'error', message: 'Internal Server Error'});
        }
    }

}

module.exports = new AdminController();