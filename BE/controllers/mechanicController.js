const catchAsync = require("../middleware/async");
const Account = require("../models/account");
const Mechanic = require("../models/mechanic");
const Accountant = require("../models/accountant");
const Manager = require("../models/manager");
const ApiError = require("../utils/ApiError");
var generator = require("generate-password");
const EmailService = require("../utils/EmailService");
const { ROLES } = require("../constant");
const OrderForm = require("../models/orderForm");
const Service = require("../models/service");
const SubService = require("../models/subService");
const Garage = require("../models/garage");
exports.pickForm = catchAsync(async (req, res) => {
  const { customerName, phone, service, address, date, time, price } = req.body;
  const accountId = req.user;
  const manager = await Manager.findOne({ accountId: accountId.id });
  const customer = await Account.findOne({ phone: phone });
  const orderForm = await OrderForm.create({
    customerName,
    phone,
    service,
    address,
    date,
    time,
    managerId: manager._id,
    customerId: customer._id,
    imgAf: "None",
    imgBf: "None",
    automaker: "None",
    type: "emergency",
    price,
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
