// routes/users.js
const express = require("express");
const router = express.Router();
const usersController = require("../controllers/user.ctrl.js");

router.get("/users", usersController.getAllUsers);
router.post("/users", usersController.createUser);

module.exports = router;
