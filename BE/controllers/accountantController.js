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

exports.updateDone = catchAsync(async (req, res) => {
  const id = req.params;
  const accountantId = req.user;
  const orderForm = await OrderForm.findByIdAndUpdate(
    id.id,
    {
      accountantId: accountantId.id,
      isPaid: true,
      status: FORM_STATUS.DONE,
    },
    { new: true }
  );
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

exports.getUnPaidForms = catchAsync(async (req, res) => {
  const accountId = req.user;
  const accountant = await Accountant.findOne({ accountId: accountId.id });
  const orderForm = await OrderForm.find({
    garageId: accountant.garageId,
    isPaid: false,
  });
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
});
