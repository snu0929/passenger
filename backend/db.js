const mongoose = require("mongoose");
require("dotenv").config();
const connection = mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("connected to database"))
  .catch(() => console.log("error connecting to db"));

module.exports = {
  connection,
};
