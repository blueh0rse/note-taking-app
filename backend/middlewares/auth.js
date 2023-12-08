require("dotenv").config();
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

// checks if token exists in the Authorization Bearer Header
exports.verifyToken = (req, res, next) => {
  console.log("test");
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Access denied 1" });
  } else {
    req.token = token;
    next();
  }
};

// checks if token is not invalid/expired
exports.verifyValidity = (req, res, next) => {
  try {
    console.log("test2");
    const decoded = jwt.verify(req.token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Access denied 2" });
  }
};

// checks if user has required role
exports.verifyRole = (requiredRole) => {
  return (req, res, next) => {
    console.log("test3");
    if (req.user.role === requiredRole) {
      next();
    } else {
      res.status(403).json({ message: "Access denied 3" });
    }
  };
};

// checks if user owns what is requested
exports.verifyPermissions = (model, field) => {
  return async (req, res, next) => {
    try {
      console.log("test4");
      // if note_id is specified
      if (req.params.note_id) {
        console.log("test5");
        // find item
        const item = await model.findOne({
          _id: req.params.note_id,
        });
        // if item not found
        if (!item) {
          return res.status(404).json({ message: "Access denied 4" });
        }
        // if user.id != note.ownerId
        if (req.user.id !== item[field]) {
          return res.status(403).json({ message: "Access denied 5" });
        }
        req.item = item;
      } else {
        console.log("test6");
        // all user notes are requested
        const items = await model.find({ [field]: req.user.id });
        // if items not found
        if (!items) {
          return res.status(404).json({ message: "Access denied 6" });
        }
        req.items = items;
      }
      next();
    } catch (error) {
      res.status(500).json({ message: error });
    }
  };
};
