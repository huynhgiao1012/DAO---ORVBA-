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
router.get(
  "/getEmergencyForm",
  jwtAuth,
  authorize("manager"),
  managerController.getEmergencyForm
);
router.post("/upload", managerController.upload);
router.get(
  "/getAllForm",
  jwtAuth,
  authorize("manager"),
  managerController.getAllForm
);
router.get(
  "/getMaintenanceForm",
  jwtAuth,
  authorize("manager"),
  managerController.getMaintenanceForm
);
router.get(
  "/getNewMaintenanceForm",
  jwtAuth,
  authorize("manager"),
  managerController.getNewMaintenanceForm
);
router.post(
  "/updateGarage",
  jwtAuth,
  authorize("manager"),
  managerController.updateGarage
);
router.post(
  "/updateIsVip/:id",
  jwtAuth,
  authorize("manager"),
  managerController.updateIsVip
);
router.post(
  "/formConfirm/:id",
  jwtAuth,
  authorize("manager"),
  managerController.formConfirm
);
router.post(
  "/updateForm/:id",
  jwtAuth,
  authorize("manager"),
  managerController.updateForm
);
router.post(
  "/updateService/:id",
  jwtAuth,
  authorize("manager"),
  managerController.updateService
);
router.post(
  "/updateSubService/:id",
  jwtAuth,
  authorize("manager"),
  managerController.updateSubService
);
router.post(
  "/checkAccount",
  jwtAuth,
  authorize("manager"),
  managerController.checkAccount
);
router.get("/getSubService/:id", jwtAuth, managerController.getSubService);
router.get("/getGarageId", jwtAuth, managerController.getGarageId);
router.get("/getGarageDetail", jwtAuth, managerController.getGarageDetail);
router.delete(
  "/deleteAccountant/:id",
  jwtAuth,
  authorize("manager"),
  managerController.deleteAccountant
);
router.delete(
  "/deleteMechanic/:id",
  jwtAuth,
  authorize("manager"),
  managerController.deleteMechanic
);
module.exports = router;
