const { Schema, model } = require("mongoose");
const validator = require("validator");

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Enter correct email address: " + value);
        }
      },
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Enter strong password: " + value);
        }
      },
    },
    age: {
      type: Number,
      trim: true,
    },
    gender: {
      type: String,
      trim: true,
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("Gender is specify incorrect..");
        }
      },
    },
    photoUrl: {
      type: String,
      trim: true,
      default: "https://i.sstatic.net/l60Hf.png",
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Enter valid photo URL: " + value);
        }
      },
    },
    about: {
      type: String,
      trim: true,
    },
    skills: {
      type: [String],
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = model("User", userSchema);
