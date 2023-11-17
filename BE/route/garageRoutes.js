const express = require("express");
const garageController = require("../controllers/garageController");
const { jwtAuth } = require("../middleware/jwtAuth");
const { authorize } = require("../middleware/authorize");
const router = express.Router();

// router.get(
//   "/getAllCompany",
//   jwtAuth,
//   authorize("admin"),
//   companyController.getAllCompany
// );
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
// router.get(
//   "/getCompanyDetail/:id",
//   jwtAuth,
//   authorize("admin", "customer"),
//   companyController.getCompany
// );
router.post(
  "/create",
  jwtAuth,
  authorize("admin"),
  garageController.createGarage
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
