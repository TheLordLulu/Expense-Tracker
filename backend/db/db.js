const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config(); 

const db = async () => {
    try {
        mongoose.set('strictQuery', false);
        if (!process.env.MONGO_URL) {
            throw new Error('MONGO_URL is not defined in the environment variables');
        }
        await mongoose.connect(process.env.MONGO_URL);
        console.log('DB Connected');
    } catch (error) {
        console.error('DB Connection Error:', error.message);
    }
};

module.exports = { db };

