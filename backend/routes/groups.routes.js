const express = require("express");
const router = express.Router();
const groupController = require("../controllers/groups.ctrl.js");

router.post("/", groupController.createGroup);
router.get("/", groupController.getAllGroups);
router.get("/:id", groupController.getGroupById);
router.put("/:id", groupController.updateGroup);
router.delete("/:id", groupController.deleteGroup);

module.exports = router;
