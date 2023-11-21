const express = require("express");
const mechanicController = require("../controllers/mechanicController");
const { jwtAuth } = require("../middleware/jwtAuth");
const { authorize } = require("../middleware/authorize");
const router = express.Router();

router.patch(
  "/pickForm/:id",
  jwtAuth,
  authorize("mechanic"),
  mechanicController.pickForm
);
router.get(
  "/getForms",
  jwtAuth,
  authorize("mechanic"),
  mechanicController.getForms
);
module.exports = router;
