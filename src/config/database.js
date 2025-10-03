const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://ChetanDev:ChetanDev23@chetandev.abdyvlq.mongodb.net/devTinder"
  );
};

module.exports = connectDB;
