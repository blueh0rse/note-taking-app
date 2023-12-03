const bcrypt = require("bcrypt");

const User = require("../models/users.model.js");
const Group = require("../models/groups.model.js");

const emailValidationRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const passwordValidationRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

// login a user
exports.loginUser = async (req, res) => {};

// logout a user
exports.logoutUser = async (req, res) => {};

// create a user
exports.createUser = async (req, res) => {
  try {
    const { email, password, username } = req.body;

    // check if email, password & username are set
    if (!email || !password || !username) {
      return res
        .status(400)
        .send({ message: "Email, password and username are required" });
    }

    // check email good format
    if (!emailValidationRegex.test(email)) {
      return res.status(400).send({ message: "Invalid email format" });
    }

    // check password minimal length and complexity
    if (!passwordValidationRegex.test(password)) {
      return res.status(400).send({ message: "Password not strong enough" });
    }

    // check if email is already in use
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).send({ message: "Email already in use" });
    }

    // password hashing
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // save new user
    const newUser = new User({ email, password: hashedPassword, username });
    await newUser.save();

    res.status(201).send({ message: "User created successfully" });
  } catch (error) {
    res.status(500).send({ message: "Server error", error });
  }
};
