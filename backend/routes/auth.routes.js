const express = require("express");
const router = express.Router();
const authController = require("../controllers/auths.ctrl.js");

router.post("/login", authController.loginUser);
router.post("/signup", authController.createUser);

module.exports = router;
