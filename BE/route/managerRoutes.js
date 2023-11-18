const express = require("express");
const managerController = require("../controllers/managerController");
const { jwtAuth } = require("../middleware/jwtAuth");
const { authorize } = require("../middleware/authorize");
const router = express.Router();

router.post(
  "/createMechanicAccount",
  jwtAuth,
  authorize("manager"),
  managerController.createMechanicAccount
);
router.post(
  "/createAccountantAccount",
  jwtAuth,
  authorize("manager"),
  managerController.createAccountantAccount
);
module.exports = router;
