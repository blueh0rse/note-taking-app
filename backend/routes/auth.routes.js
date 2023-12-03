const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.ctrl.js");

router.post("/login", authController.loginUser);
router.get("/logout", authController.logoutUser);
router.post("/signup", authController.createUser);

module.exports = router;
