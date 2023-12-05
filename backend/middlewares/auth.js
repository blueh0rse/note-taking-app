require("dotenv").config();
const jwt = require("jsonwebtoken");
var mongoose = require("mongoose");

exports.verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Access denied 1" });
  }
  req.token = token;
  next();
};

exports.verifyValidity = (req, res, next) => {
  try {
    const decoded = jwt.verify(req.token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Access denied 2" });
  }
};

exports.verifyRole = (requiredRole) => {
  return (req, res, next) => {
    if (req.user.role === requiredRole) {
      next();
    } else {
      res.status(403).json({ message: "Access denied 3" });
    }
  };
};

exports.verifyPermissions = (model, field) => {
  return async (req, res, next) => {
    try {
      // search for item
      console.log(req.params.note_name);
      const item = await model.findOne({ name: req.params.note_name });
      console.log(item);
      if (!item) {
        return res.status(404).json({ message: "Access denied 1" });
      }
      // look for item owner
      if (req.user.id !== item[field].toString()) {
        return res.status(403).json({ message: "Access denied 2" });
      }
      console.log("ok");
      req.item = item;
      next();
    } catch (error) {
      res.status(500).json({ message: "Error." });
    }
  };
};
