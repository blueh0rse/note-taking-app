const User = require("./models/User");

exports.getAllUsers = async (req, res) => {
  // Logique pour obtenir tous les utilisateurs
};

exports.createUser = async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).send("Utilisateur créé");
  } catch (error) {
    res.status(500).send("Couldn't create the user :(");
  }
};
