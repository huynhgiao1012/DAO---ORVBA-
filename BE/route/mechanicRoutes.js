const express = require("express");
const mechanicController = require("../controllers/mechanicController");
const { jwtAuth } = require("../middleware/jwtAuth");
const { authorize } = require("../middleware/authorize");
const router = express.Router();

// router.patch(
//   "/updateGarage",
//   jwtAuth,
//   authorize("mechanic"),
//   managerController.updateGarage
// );
router.get(
  "/getForms",
  jwtAuth,
  authorize("mechanic"),
  mechanicController.getForms
);
module.exports = router;
