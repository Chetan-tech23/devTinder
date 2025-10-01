const mongoose = require("mongoose");

const connectDB = async () => {
  mongoose.set("useCreateIndex", true);
  mongoose.set('useFindAndModify', false);

  await mongoose.connect(
    "mongodb+srv://ChetanDev:ChetanDev23@chetandev.abdyvlq.mongodb.net/devTinder",
    { useNewUrlParser: true, useUnifiedTopology: true }
  );
};

module.exports = connectDB;
