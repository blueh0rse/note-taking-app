const User = require("../models/users.model.js");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("email");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const userId = validator.escape(req.params.id);
    const user = await User.findById(userId).select("email role");
    if (!user) res.status(404).json({ message: "User not found!" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const emailValidationRegex =
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const new_email = validator.escape(req.body.email);
    const userId = validator.escape(req.params.id);

    if (!userId) {
      return res.status(401).send({ message: "Bad request" });
    }

    if (new_email) {
      if (emailValidationRegex.test(new_email)) {
        return res.status(401).send({ message: "Bad request" });
      }
      const new_user = {};
      new_user.email = new_email;
      const updatedUser = await User.findByIdAndUpdate(userId, new_user, {
        new: true,
      }).select("email");
      res.status(200).json(updatedUser);
    } else {
      return res.status(401).send({ message: "Bad request" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const userId = validator.escape(req.params.id);
    await User.findByIdAndDelete(userId);
    res.status(200).json({ message: "User deleted!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
