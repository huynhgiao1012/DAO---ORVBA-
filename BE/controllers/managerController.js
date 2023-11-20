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
// const { Manager } = require("socket.io-client");
exports.createMechanicAccount = catchAsync(async (req, res) => {
  const { name, email, phone, group } = req.body;
  const accountId = req.user;
  const manager = await Manager.findOne({ accountId: accountId.id });
  var password = generator.generateMultiple(1, {
    length: 10,
    numbers: true,
    symbols: true,
    lowercase: true,
    uppercase: true,
    strict: true,
  })[0];
  const account = await Account.create({
    name,
    email,
    phone,
    password,
    role: ROLES.MECHANIC,
    isActive: true,
  });
  const mechanic = await Mechanic.create({
    accountId: account._id,
    garageId: manager.garageId,
    group: group,
  });
  await EmailService.sendMail(
    process.env.EMAIL,
    `${email}`,
    "YOUR ACCOUNT IS ACTIVE",
    `Your passwors: ${password}`
  );
  res.status(200).json({
    success: true,
    message: "Successfull",
    account: account,
    mechanic: mechanic,
  });
});
exports.createAccountantAccount = catchAsync(async (req, res) => {
  const { name, email, phone } = req.body;
  const accountId = req.user;
  const manager = await Manager.findOne({ accountId: accountId.id });
  var password = generator.generateMultiple(1, {
    length: 10,
    numbers: true,
    symbols: true,
    lowercase: true,
    uppercase: true,
    strict: true,
  })[0];
  const account = await Account.create({
    name,
    email,
    phone,
    password,
    role: ROLES.ACCOUNTANT,
    isActive: true,
  });
  const accountant = await Accountant.create({
    accountId: account._id,
    garageId: manager.garageId,
  });
  await EmailService.sendMail(
    process.env.EMAIL,
    `${email}`,
    "YOUR ACCOUNT IS ACTIVE",
    `Your passwors: ${password}`
  );
  res.status(200).json({
    success: true,
    message: "Successfull",
    account: account,
    accountant: accountant,
  });
});
exports.getAllAccountant = catchAsync(async (req, res) => {
  const accountId = req.user;
  const manager = await Manager.findOne({ accountId: accountId.id });
  const accountant = await Accountant.find({
    garageId: manager.garageId,
  }).populate("accountId", "name email phone img _id");
  if (!accountant) {
    throw new ApiError(400, "Not available");
  }
  res.status(200).json({
    success: true,
    accountant,
  });
});
exports.getAllMechanic = catchAsync(async (req, res) => {
  const accountId = req.user;
  const manager = await Manager.findOne({ accountId: accountId.id });
  const mechanic = await Mechanic.find({ garageId: manager.garageId }).populate(
    "accountId",
    "name email phone img _id"
  );
  if (!mechanic) {
    throw new ApiError(400, "Not available");
  }
  res.status(200).json({
    success: true,
    mechanic,
  });
});
exports.getAllEmployee = catchAsync(async (req, res) => {
  const accountId = req.user;
  const manager = await Manager.findOne({ accountId: accountId.id });
  const mechanic = await Mechanic.find({ garageId: manager.garageId }).populate(
    "accountId",
    "name email phone img _id"
  );
  const accountant = await Accountant.find({
    garageId: manager.garageId,
  }).populate("accountId", "name email phone img _id");
  if (!mechanic || !accountant) {
    throw new ApiError(400, "Not available");
  }
  res.status(200).json({
    success: true,
    data: mechanic.concat(accountant),
  });
});
exports.createEmergencyForm = catchAsync(async (req, res) => {
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
exports.createService = catchAsync(async (req, res) => {
  const { serviceName, estimatedPrice } = req.body;
  const accountId = req.user;
  const manager = await Manager.findOne({ accountId: accountId.id });
  const service = await Service.create({
    serviceName,
    estimatedPrice,
    garageId: manager.garageId,
  });
  if (service) {
    res.status(200).json({
      success: true,
      message: "Successfull",
      orderForm: service,
    });
  } else {
    res.status(400).json({
      success: false,
      message: "Failed",
    });
  }
});
exports.createSubService = catchAsync(async (req, res) => {
  const { subName, subPrice } = req.body;
  const serviceId = req.params;
  const service = await SubService.create({
    subName,
    subPrice,
    serviceId: serviceId.id,
  });
  if (service) {
    res.status(200).json({
      success: true,
      message: "Successfull",
      orderForm: service,
    });
  } else {
    res.status(400).json({
      success: false,
      message: "Failed",
    });
  }
});
exports.getAllService = catchAsync(async (req, res) => {
  const accountId = req.user;
  const manager = await Manager.findOne({ accountId: accountId.id });
  const services = await Service.find({
    garageId: manager.garageId,
  });
  if (!services) {
    throw new ApiError(400, "Not available");
  }
  res.status(200).json({
    success: true,
    services,
  });
});
exports.getSubService = catchAsync(async (req, res) => {
  const serviceId = req.params;
  const subServices = await SubService.find({
    serviceId: serviceId.id,
  });
  if (!subServices) {
    throw new ApiError(400, "Not available");
  }
  res.status(200).json({
    success: true,
    subServices,
  });
});
exports.createEmergencyForm = catchAsync(async (req, res) => {
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
exports.updateGarage = catchAsync(async (req, res) => {
  const accountId = req.user;
  const manager = await Manager.findOne({ accountId: accountId.id });
  const {
    name,
    phone,
    openTime,
    closeTime,
    longitude,
    latitude,
    address,
    description,
    transferInfo,
  } = req.body;
  const gara = await Garage.findOneAndUpdate(
    { id: manager.garageId },
    {
      name,
      phone,
      openTime,
      closeTime,
      longitude,
      latitude,
      address,
      description,
      transferInfo,
    },
    { new: true }
  );
  if (!gara) {
    throw new ApiError(400, "This garage is not available");
  }
  res.status(200).json({
    success: true,
    message: "Update successfully",
    garage: gara,
  });
});
