const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const MONGODB_URL = process.env.MONGODB_URL;

const connectToDatabase = async () => {
    try {
        await mongoose.connect(MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB Connection Success!');
    } catch (error) {
        console.error('MongoDB Connection Error:', error);
    }
};

module.exports = connectToDatabase;
