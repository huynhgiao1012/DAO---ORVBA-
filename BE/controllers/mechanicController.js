const catchAsync = require("../middleware/async");
const Account = require("../models/account");
const Mechanic = require("../models/mechanic");
const Accountant = require("../models/accountant");
const Manager = require("../models/manager");
const ApiError = require("../utils/ApiError");
var generator = require("generate-password");
const EmailService = require("../utils/EmailService");
const { ROLES, FORM_STATUS } = require("../constant");
const OrderForm = require("../models/orderForm");
const Service = require("../models/service");
const SubService = require("../models/subService");
const Garage = require("../models/garage");
exports.pickForm = catchAsync(async (req, res) => {
  const mechanicId = req.user;
  const id = req.params;
  const orderForm = await OrderForm.findByIdAndUpdate(id.id, {
    mechanicId: mechanicId.id,
    status: FORM_STATUS.PROCESS,
  });
  if (orderForm) {
    res.status(200).json({
      success: true,
      message: "Successfully",
      orderForm,
    });
  } else {
    res.status(400).json({
      success: false,
      message: "Failed",
    });
  }
});
exports.getForms = catchAsync(async (req, res) => {
  const accountId = req.user;
  const mechanic = await Mechanic.findOne({ accountId: accountId.id });
  if (mechanic.group === "emergency") {
    const orderForm = await OrderForm.find({ type: mechanic.group });
    if (orderForm) {
      res.status(200).json({
        success: true,
        message: "Successfull",
        orderForm: orderForm,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Failed",
      });
    }
  } else if (mechanic.group === "maintenance") {
    const orderForm = await OrderForm.find({ type: mechanic.group });
    if (orderForm) {
      res.status(200).json({
        success: true,
        message: "Successfull",
        orderForm: orderForm,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Failed",
      });
    }
  }
});
