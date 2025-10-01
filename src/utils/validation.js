const validator = require("validator");

const validateSignupData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;

  if (!firstName.trim() || !lastName.trim()) {
    throw new Error("Name is invalid!");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Email id is invalid!");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Password is weak!");
  }
};

module.exports = { validateSignupData };
