const express = require("express");
const mechanicController = require("../controllers/mechanicController");
const { jwtAuth } = require("../middleware/jwtAuth");
const { authorize } = require("../middleware/authorize");
const router = express.Router();

router.post(
  "/pickForm/:id",
  jwtAuth,
  authorize("mechanic"),
  mechanicController.pickForm
);
router.post(
  "/updateBefore/:id",
  jwtAuth,
  authorize("mechanic"),
  mechanicController.updateBefore
);
router.post(
  "/updateFinish/:id",
  jwtAuth,
  authorize("mechanic"),
  mechanicController.updateFinish
);
router.get(
  "/getForms",
  jwtAuth,
  authorize("mechanic"),
  mechanicController.getForms
);
module.exports = router;