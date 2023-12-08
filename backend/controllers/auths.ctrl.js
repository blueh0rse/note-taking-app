require("dotenv").config();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/users.model.js");

const emailValidationRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const passwordValidationRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

// login a user
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
      return res
        .status(400)
        .send({ message: "Email and password are required" });
    }

    // check email good format
    if (!emailValidationRegex.test(email)) {
      return res.status(400).send({ message: "Invalid email format" });
    }

    // check password minimal length and complexity
    if (!passwordValidationRegex.test(password)) {
      return res.status(400).send({ message: "Password not accepted" });
    }

    // check if email exists in the database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send({ message: "Invalid email or password" });
    }

    // check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({ message: "Invalid email or password2" });
    }

    // generate JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).send({ message: "Login successful", token });
  } catch (error) {
    res.status(500).send({ message: "Server error", error });
  }
};

// create a user
exports.createUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    // check if email & password are set
    if (!email || !password) {
      return res
        .status(400)
        .send({ message: "Email and password are required." });
    }

    // check email good format
    if (!emailValidationRegex.test(email)) {
      return res.status(400).send({ message: "Invalid email format." });
    }

    // check password minimal length and complexity
    if (!passwordValidationRegex.test(password)) {
      return res.status(400).send({ message: "Password not strong enough." });
    }

    // check if email is already in use
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).send({ message: "Email already in use." });
    }

    // password hashing
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // save new user
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    res.status(201).send({ message: "User created successfully." });
  } catch (error) {
    res.status(500).send({ message: "Server error.", error });
  }
};
