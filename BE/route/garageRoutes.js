const express = require("express");
const garageController = require("../controllers/garageController");
const managerController = require("../controllers/managerController");
const { jwtAuth } = require("../middleware/jwtAuth");
const { authorize } = require("../middleware/authorize");
const router = express.Router();

// router.get(
//   "/getCorCompany",
//   jwtAuth,
//   authorize("customer"),
//   companyController.getCorCompany
// );
// router.get(
//   "/getSpecificCorCompany",
//   jwtAuth,
//   authorize("company"),
//   companyController.getSpecificCorCompany
// );
router.get(
  "/getGarageDetail/:id",
  jwtAuth,
  authorize("admin", "customer"),
  garageController.getGarageDetails
);
router.post(
  "/create",
  jwtAuth,
  authorize("admin"),
  garageController.createGarage
);
router.get(
  "/getAllGarage",
  jwtAuth,
  authorize("admin"),
  garageController.getAllGarage
);
router.get("/getCorGarage", jwtAuth, garageController.getCorGarage);
router.get(
  "/getSpecificCorGarage",
  jwtAuth,
  garageController.getSpecificCorGarage
);
router.post(
  "/createManagerAccount/:id",
  jwtAuth,
  authorize("admin"),
  garageController.createManagerAccount
);
// router.delete(
//   "/:id",
//   jwtAuth,
//   authorize("admin"),
//   companyController.deleteCompany
// );
// router.patch(
//   "/:id",
//   jwtAuth,
//   authorize("admin"),
//   companyController.updateCompany
// );
module.exports = router;
