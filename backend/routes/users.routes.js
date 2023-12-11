const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth.js");
const userController = require("../controllers/users.ctrl.js");

router.get(
  "/",
  auth.verifyToken,
  auth.verifyValidity,
  auth.verifyRole("admin"),
  userController.getAllUsers
);
router.get(
  "/:id",
  auth.verifyToken,
  auth.verifyValidity,
  auth.verifyRole("admin"),
  userController.getUserById
);
router.put(
  "/:id",
  auth.verifyToken,
  auth.verifyValidity,
  auth.verifyRole("admin"),
  userController.updateUser
);
router.delete(
  "/:id",
  auth.verifyToken,
  auth.verifyValidity,
  auth.verifyRole("admin"),
  userController.deleteUser
);

module.exports = router;
