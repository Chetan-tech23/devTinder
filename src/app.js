const express = require("express");
const app = express();
const connectDB = require("./config/database");
const User = require("./models/user");

const PORT = 7777;

app.post("/signup", async (req, res) => {
  // Creating new instance of User
  const user = new User({
    firstName: "Psresh",
    lastName: "Malpure",
    emailId: "Paresh@gmail.com",
    password: "Paresh@123",
  });

  try {
    await user.save();
    res.send("User is saved successfully!!");
  } catch (err) {
    res.send("Something error in user saving!!! " + err);
  }
});

connectDB()
  .then(() => {
    console.log("Database successfully established...");
    app.listen(PORT, () => {
      console.log(`Server is running at ${PORT} port!`);
    });
  })
  .catch((err) => {
    console.log("Database connection failed!!!", err);
  });
