const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  endpoint: process.env.API_URL,
  masterKey: process.env.API_KEY,
  port: process.env.PORT,
  jwt_secret: process.env.JWT_SECRET,
  jwt_expiration_in_seconds: 36000,
  //environment: "dev",
  permissionLevels: {
        NORMAL_USER: 1,
        PAID_USER: 4,
        ADMIN: 2048
    }
};