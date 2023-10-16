const { MongoClient } = require('mongodb');

require('dotenv').config();
const MONGO_DB_URL = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017';

let db = null;

const connection = () => {
    return db
    ? Promise.resolve(db)
    : MongoClient.connect(MONGO_DB_URL)
    .then((conn) => {
    db = conn.db('chatTelegramFlashvolve');
    return db;
    })
};

module.exports = connection;