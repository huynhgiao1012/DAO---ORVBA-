const express = require("express");
const serviceController = require("../controllers/serviceController");
const { jwtAuth } = require("../middleware/jwtAuth");
const { authorize } = require("../middleware/authorize");
const router = express.Router();
router.get(
  "/getAllService/:id",
  jwtAuth,
  authorize("manager", "customer", "admin"),
  serviceController.getAllService
);
router.get(
  "/getServiceDetail/:id",
  jwtAuth,
  authorize("manager", "customer", "admin"),
  serviceController.getService
);
router.post(
  "/create",
  jwtAuth,
  authorize("manager"),
  serviceController.createService
);
router.post(
  "/add/:id",
  jwtAuth,
  authorize("admin"),
  serviceController.addService
);
router.post(
  "/bookingService",
  jwtAuth,
  authorize("customer"),
  serviceController.bookingService
);
router.delete(
  "/:id",
  jwtAuth,
  authorize("manager", "admin"),
  serviceController.deleteService
);
router.patch(
  "/:id",
  jwtAuth,
  authorize("manager", "admin"),
  serviceController.updateService
);
module.exports = router;
