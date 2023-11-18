const catchAsync = require("../middleware/async");
const Account = require("../models/account");
const Mechanic = require("../models/mechanic");
const Accountant = require("../models/accountant");
const Manager = require("../models/manager");
const ApiError = require("../utils/ApiError");
var generator = require("generate-password");
const EmailService = require("../utils/EmailService");
const { ROLES } = require("../constant");
const mechanic = require("../models/mechanic");
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
// exports.updateCompany = catchAsync(async (req, res) => {
//   const { id } = req.params;
//   const { name, phone, openTime, closeTime, long, lat, address } = req.body;
//   const account = await Account.findByIdAndUpdate(
//     id,
//     { name, phone },
//     { new: true }
//   );
//   const company = await Company.findOneAndUpdate(
//     { accountId: id },
//     { openTime, closeTime, long, lat, address },
//     { new: true }
//   );
//   if (!account || !company) {
//     throw new ApiError(400, "This company is not available");
//   }
//   res.status(200).json({
//     success: true,
//     message: "Update successfully",
//     accountInfo: account,
//     companyInfo: company,
//   });
// });
