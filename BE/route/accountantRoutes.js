const express = require("express");
const accountantController = require("../controllers/accountantController");
const { jwtAuth } = require("../middleware/jwtAuth");
const { authorize } = require("../middleware/authorize");
const router = express.Router();

router.post(
  "/updateDone/:id",
  jwtAuth,
  authorize("accountant"),
  accountantController.updateDone
);
router.get(
  "/getUnPaidForms",
  jwtAuth,
  authorize("accountant"),
  accountantController.getUnPaidForms
);
module.exports = router;
