const catchAsync = require("../middleware/async");
const Account = require("../models/account");
const Mechanic = require("../models/mechanic");
const Accountant = require("../models/accountant");
const Customer = require("../models/customer");
const Manager = require("../models/manager");
const ApiError = require("../utils/ApiError");
var generator = require("generate-password");
const EmailService = require("../utils/EmailService");
const { ROLES, FORM_STATUS, GROUP } = require("../constant");
const OrderForm = require("../models/orderForm");
const Service = require("../models/service");
const SubService = require("../models/subService");
const Garage = require("../models/garage");
const { io } = require("socket.io-client");

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
  const { customerName, phone, service, address, price, note } = req.body;
  const accountId = req.user;
  const manager = await Manager.findOne({ accountId: accountId.id });
  const accountInfo = await Account.findOne({ phone: phone });
  if (accountInfo) {
    const customer = await Customer.findOne({ accountId: accountInfo._id });
    const currentDay = new Date();
    const orderForm = await OrderForm.create({
      customerName,
      phone,
      service,
      address,
      date: currentDay.toISOString().slice(0, 10),
      time:
        currentDay.getHours() +
        ":" +
        currentDay.getMinutes() +
        ":" +
        (currentDay.getSeconds() + 1),
      managerId: manager._id,
      customerId: customer._id,
      garageId: manager.garageId,
      imgAf: "None",
      imgBf: "None",
      automaker: "None",
      type: "emergency",
      price,
      note,
    });
    const socketIo = io("http://localhost:3000");
    socketIo.emit("sendEmergencyForm", {
      data: orderForm,
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
  } else {
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
exports.getEmergencyForm = catchAsync(async (req, res) => {
  const accountId = req.user;
  const manager = await Manager.findOne({ accountId: accountId.id });
  const orderForm = await OrderForm.find({
    garageId: manager.garageId,
    type: GROUP.EMERGENCY,
    isPaid: false,
  });
  if (!orderForm) {
    throw new ApiError(400, "Not available");
  }
  res.status(200).json({
    success: true,
    orderForm,
  });
});
exports.getMaintenanceForm = catchAsync(async (req, res) => {
  const accountId = req.user;
  const manager = await Manager.findOne({ accountId: accountId.id });
  const orderForm = await OrderForm.find({
    garageId: manager.garageId,
    type: GROUP.MAINTENANCE,
    isPaid: false,
  });
  if (!orderForm) {
    throw new ApiError(400, "Not available");
  }
  res.status(200).json({
    success: true,
    orderForm,
  });
});
exports.getGarageDetail = catchAsync(async (req, res) => {
  const accountId = req.user;
  const manager = await Manager.findOne({ accountId: accountId.id });
  const garage = await Garage.findById(manager.garageId);
  if (!garage) {
    throw new ApiError(400, "Not available");
  }
  res.status(200).json({
    success: true,
    garage,
  });
});
exports.getAllForm = catchAsync(async (req, res) => {
  const accountId = req.user;
  const manager = await Manager.findOne({ accountId: accountId.id });
  const orderForm = await OrderForm.find({
    garageId: manager.garageId,
  });
  if (!orderForm) {
    throw new ApiError(400, "Not available");
  }
  res.status(200).json({
    success: true,
    orderForm,
  });
});
exports.updateIsVip = catchAsync(async (req, res) => {
  const { id } = req.params;
  const customer = await Customer.findOneAndUpdate(id, {
    isVIP: true,
  });
  if (!customer) {
    throw new ApiError(400, "Not available");
  }
  res.status(200).json({
    success: true,
    message: "Update successfully",
  });
});
// manager update lai form trong truong hop can doi ngay
exports.updateForm = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { date, time } = req.body;
  const accountId = req.user;
  const manager = await Manager.findOne({ accountId: accountId.id });
  const orderForm = await OrderForm.findOneAndUpdate(
    id,
    {
      date,
      time,
      managerId: manager._id,
      status: FORM_STATUS.BOOKED,
    },
    { new: true }
  );
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
// truong hop book lich bao duong thuan loi => manager confirms form => gui thong bao den khach hang
exports.formConfirm = catchAsync(async (req, res) => {
  const { id } = req.params;
  const accountId = req.user;
  const manager = await Manager.findOne({ accountId: accountId.id });
  const orderForm = await OrderForm.findOneAndUpdate(
    id,
    {
      managerId: manager._id,
      status: FORM_STATUS.BOOKED,
    },
    { new: true }
  );
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
    img,
    address,
    description,
    transferInfo,
  } = req.body;
  const gara = await Garage.findByIdAndUpdate(
    manager.garageId,
    {
      name: name,
      phone: phone,
      openTime: openTime,
      closeTime: closeTime,
      longitude: longitude,
      latitude: latitude,
      img: img,
      address: address,
      description: description,
      transferInfo: transferInfo,
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
exports.updateService = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { name, price } = req.body;
  const service = await Service.findByIdAndUpdate(
    id,
    {
      serviceName: name,
      estimatedPrice: price,
    },
    { new: true }
  );
  if (!service) {
    throw new ApiError(400, "Service is not available");
  }
  res.status(200).json({
    success: true,
    message: "Update successfully",
    service,
  });
});
exports.updateSubService = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { name, price } = req.body;
  const subService = await SubService.findByIdAndUpdate(
    id,
    {
      subName: name,
      subPrice: price,
    },
    { new: true }
  );
  console.log(subService);
  if (!subService) {
    throw new ApiError(400, "Service is not available");
  }
  res.status(200).json({
    success: true,
    message: "Update successfully",
    subService,
  });
});
// delete mechanic
exports.deleteMechanic = catchAsync(async (req, res) => {
  const { id } = req.params;
  const mechanic = await Mechanic.findById(id);
  const account = await Account.findById(mechanic.accountId);
  if (!mechanic) {
    throw new ApiError(400, "Mechanic is not available");
  }
  await account.remove();
  await mechanic.remove();
  res.status(200).json({
    success: true,
    message: "Delete successfully!",
  });
});

// delete accountant
exports.deleteAccountant = catchAsync(async (req, res) => {
  const { id } = req.params;
  const accountant = await Accountant.findById(id);
  const account = await Account.findById(accountant.accountId);
  if (!accountant) {
    throw new ApiError(400, "Mechanic is not available");
  }
  await account.remove();
  await accountant.remove();
  res.status(200).json({
    success: true,
    message: "Delete successfully!",
  });
});
exports.upload = catchAsync(async (req, res) => {
  res.status(200).json({
    success: true,
  });
});
