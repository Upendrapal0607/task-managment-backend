const mongoose = require("mongoose");
require("dotenv").config();
const dbConnection = mongoose.connect(process.env.MONGO_DB_URL);

module.exports = {
  dbConnection,
};
