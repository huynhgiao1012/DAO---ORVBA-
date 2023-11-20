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
router.post(
  "/createEmergencyForm",
  jwtAuth,
  authorize("manager"),
  managerController.createEmergencyForm
);
router.post(
  "/createService",
  jwtAuth,
  authorize("manager"),
  managerController.createService
);
router.post(
  "/createSubService/:id",
  jwtAuth,
  authorize("manager"),
  managerController.createSubService
);
router.get(
  "/getAllAccountant",
  jwtAuth,
  authorize("manager"),
  managerController.getAllAccountant
);
router.get(
  "/getAllMechanic",
  jwtAuth,
  authorize("manager"),
  managerController.getAllMechanic
);
router.get(
  "/getAllEmployee",
  jwtAuth,
  authorize("manager"),
  managerController.getAllEmployee
);
router.get(
  "/getAllServiceMa",
  jwtAuth,
  authorize("manager"),
  managerController.getAllService
);
router.patch(
  "/updateGarage",
  jwtAuth,
  authorize("manager"),
  managerController.updateGarage
);
router.get("/getSubService/:id", jwtAuth, managerController.getSubService);
module.exports = router;
