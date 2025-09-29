const express = require("express");
const app = express();
const connectDB = require("./config/database");
const User = require("./models/user");

const PORT = 7777;

app.use(express.json());

app.post("/signup", async (req, res) => {
  // Creating a instance of the User model
  const user = new User(req.body);

  try {
    await user.save();
    res.send("User is saved successfully!!");
  } catch (err) {
    res.status(400).send("Something error in user saving!!! " + err.message);
  }
});

/**
 * Creating API - find User by emailId
 */
app.get("/user", async (req, res) => {
  try {
    const users = await User.find({ emailId: req.body.emailId });
    if (users.length === 0) {
      res.send("User not found!!!");
    } else {
      res.send(users);
    }
  } catch (err) {
    res.status(400).send("Something went wrong!");
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
