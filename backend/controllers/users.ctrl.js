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
    const user = await User.findById(req.params.id).select("email role");
    if (!user) res.status(404).json({ message: "User not found!" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const new_email = req.body.email;
    if (new_email) {
      const new_user = {};
      new_user.email = new_email;
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        new_user,
        {
          new: true,
        }
      ).select("email");
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
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "User deleted!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
