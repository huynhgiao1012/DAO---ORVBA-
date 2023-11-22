const { FORM_STATUS } = require("../constant");
const catchAsync = require("../middleware/async");
const Account = require("../models/account");
const Customer = require("../models/customer");
const OrderForm = require("../models/orderForm");
const ApiError = require("../utils/ApiError");

// each users get their information
exports.getUserDetails = catchAsync(async (req, res) => {
  const { id } = req.user;
  const data = await Account.findById(id);
  if (!data) {
    throw new ApiError(400, "This user is not available");
  }
  res.status(200).json({
    success: true,
    data,
  });
});
// customer can view customer's point
exports.getUserPoint = catchAsync(async (req, res) => {
  const { id } = req.user;
  const data = await Customer.findOne({ accountId: id });
  if (!data) {
    throw new ApiError(400, "This user is not available");
  }
  res.status(200).json({
    success: true,
    data,
  });
});
// update point of user after using service
exports.updateCustomerPoint = catchAsync(async (req, res) => {
  const { id } = req.user;
  const { point } = req.body;
  const Point = await Customer.findOne({ accountId: id });
  const data = await Customer.findOneAndUpdate(
    { accountId: id },
    { point: Number(point) + Number(Point.point) },
    { new: true }
  );
  if (!data) {
    throw new ApiError(400, "This user is not available");
  }
  res.status(200).json({
    success: true,
    data,
  });
});
// booking maintenance
exports.bookingMaintenance = catchAsync(async (req, res) => {
  const {
    customerName,
    phone,
    service,
    address,
    date,
    time,
    price,
    note,
    garageId,
  } = req.body;
  const accountId = req.user;
  const customer = await Customer.findOne({ accountId: accountId.id });
  const orderForm = await OrderForm.create({
    customerName,
    phone,
    service,
    address,
    date,
    time,
    customerId: customer._id,
    garageId: garageId,
    imgAf: "None",
    imgBf: "None",
    automaker: "None",
    type: "maintenance",
    price,
    note,
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

exports.getUnFeedForm = catchAsync(async (req, res) => {
  const accountId = req.user;
  const customer = await Customer.findOne({ accountId: accountId.id });
  const orderForm = await OrderForm.find({
    isFeedback: false,
    customerId: customer._id,
    status: FORM_STATUS.DONE,
  });
  if (!orderForm) {
    throw new ApiError(400, "Not available");
  }
  res.status(200).json({
    success: true,
    orderForm,
  });
});
