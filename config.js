require('dotenv').config();

const {
  PORT = 3000,
  MONGO_URL = 'mongodb://127.0.0.1:27017/bitfilmsdb',
  JWT_SECRET = 'SECRET_KEY',
  NODE_ENV = 'production',
} = process.env;

module.exports = {
  PORT, MONGO_URL, JWT_SECRET, NODE_ENV,
};
