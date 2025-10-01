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

/**
 * Creating API - find all user
 */
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    if (users.length === 0) {
      res.send("User not found!");
    } else {
      res.send(users);
    }
  } catch (err) {
    res.status(400).send("Something went wrong!!!");
  }
});

/**
 * Creating API - Delete User
 */
app.delete("/user", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.body.userId);
    if (user.length === 0) {
      res.send("User not found!");
    } else {
      res.send("User deleted successfully!");
    }
  } catch (err) {
    res.status(400).send("Something went wrong!!!");
  }
});

/**
 * Creating API - Update data of User
 */
 app.patch("/user", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.body.userId, req.body.update);
    if (user.length === 0) {
      res.send("User not found!");
    } else {
      res.send("User updated successfully!");
    }
  } catch (err) {
    res.status(400).send("Something went wrong!!!");
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
