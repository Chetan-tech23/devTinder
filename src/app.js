const express = require("express");
const app = express();
const connectDB = require("./config/database");
const User = require("./models/user");
const { validateSignupData } = require("./utils/validation");
const bcrypt = require("bcrypt");

const PORT = 7777;

app.use(express.json());

/**
 * API - Signup
 */
app.post("/signup", async (req, res) => {
  try {
    // Validate Request Data
    validateSignupData(req);

    const { firstName, lastName, emailId, password } = req.body;

    // Encrypt the password
    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });

    await user.save();
    res.send("User is registered successfully!!");
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

/**
 * API - Login
 */
app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId: emailId });

    if (!user) {
      throw new Error("Invalid credentials!");
    }

    const isValidCred = await bcrypt.compare(password, user.password);
    if (!isValidCred) {
      throw new Error("Invalid credentials!");
    } else {
      res.send("Login successfull!!!");
    }
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

/**
 * API - find User by emailId
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
 *  API - find all user
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
 *  API - Delete User
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
 *  API - Update data of User
 */
app.patch("/user/:userId", async (req, res) => {
  const userId = req.params.userId;
  const data = req.body;
  try {
    const ALLOWED_FIELDS = [
      "firstName",
      "lastName",
      "age",
      "gender",
      "photoUrl",
      "about",
      "skills",
    ];
    const isAllowedUser = Object.keys(data).every((k) =>
      ALLOWED_FIELDS.includes(k)
    );
    if (!isAllowedUser) {
      throw new Error(
        "Update Failed : Random or restricted Fields are not allowd"
      );
    }

    if (data.skills.length > 10) {
      throw new Error("Update Failed : More than 10 skills not allowed!");
    }

    const user = await User.findByIdAndUpdate(userId, data, {
      runValidators: true,
    });
    if (user.length === 0) {
      res.send("User not found!");
    } else {
      res.send("User updated successfully!");
    }
  } catch (err) {
    res
      .status(400)
      .send("Something went wrong on user updation : " + err.message);
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
